/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

function setupTest(aModule) {
  aModule.controller = mozmill.getBrowserController();
}

function testPassingRestart() {
  assert.ok(persisted.restarted,
            "timeout for userShutdown caused a restart of the application.");
}