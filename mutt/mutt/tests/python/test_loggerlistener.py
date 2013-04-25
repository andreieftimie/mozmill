# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, you can obtain one at http://mozilla.org/MPL/2.0/.

from cStringIO import StringIO
import os
import unittest
import tempfile

import mozmill
from mozmill.logger import LoggerListener


class ModuleTest(unittest.TestCase):
    def make_test(self):
        """make an example test to run"""
        test = """var test_something = function() {}"""
        fd, path = tempfile.mkstemp()
        os.write(fd, test)
        os.close(fd)

        return path

    def test_logger_listener(self):
        self.path = self.make_test()
        tests = [{'path': self.path}]

        info_data = StringIO()
        debug_data = StringIO()

        logger_info = LoggerListener(console_level="INFO",
                                     console_stream=info_data)
        logger_debug = LoggerListener(console_level="DEBUG",
                                      console_stream=debug_data)

        m = mozmill.MozMill.create(handlers=[logger_info, logger_debug])
        m.run(tests)
        m.finish()

        assert "TEST-START" in debug_data.getvalue()
        assert "TEST-PASS" in debug_data.getvalue()
        assert "DEBUG" in debug_data.getvalue()

        assert "TEST-START" in debug_data.getvalue()
        assert "TEST-PASS" in debug_data.getvalue()
        assert "DEBUG" not in info_data.getvalue()

    def tearDown(self):
        os.remove(self.path)

if __name__ == '__main__':
    unittest.main()
