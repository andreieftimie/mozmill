/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Cu.import("resource://gre/modules/Services.jsm");

const TEST_URL = collector.addHttpResource("../_files/") + "popup.html";

var setupModule = function (aModule) {
  aModule.controller = mozmill.getBrowserController();
  aModule.popupController1 = null;
  aModule.popupController2 = null;
}

var testMenu = function () {
  controller.open(TEST_URL);
  controller.waitForPageLoad();

  // Open 2 popups
  var popupWindow1 = controller.window.open(TEST_URL);
  var popupWindow2 = controller.window.open(TEST_URL);

  // Instantiate controller for 2nd popup
  popupController2 = new mozmill.controller.MozMillController(popupWindow2);

  // Check initial order
  var enumerator = Services.wm.getZOrderDOMWindowEnumerator(null, false);
  var intialWindowsOrder = [];
  while (enumerator.hasMoreElements()) {
    var id = mozmill.utils.getWindowId(enumerator.getNext());
    intialWindowsOrder.push(id);
  }

  // Instantiate controller for 1nd popup
  popupController1 = new mozmill.controller.MozMillController(popupWindow1);

  // Check order after controller instantiation
  var enumerator = Services.wm.getZOrderDOMWindowEnumerator(null, false);
  finalWindowsOrder = [];
  while (enumerator.hasMoreElements()) {
    var id = mozmill.utils.getWindowId(enumerator.getNext());
    finalWindowsOrder.push(id);
  }

  // Check that the order has been maintained
  assert.deepEqual(intialWindowsOrder, finalWindowsOrder,
                   "Windows have not changed their order");
}

var teardownModule = function (aModule) {
  aModule.popupController1.window.close();
  aModule.popupController2.window.close();
}

