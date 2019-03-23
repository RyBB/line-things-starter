/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./liff.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./liff.js":
/*!*****************!*\
  !*** ./liff.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// User service UUID: Change this to your generated service UUID\nvar USER_SERVICE_UUID = 'd6d379f5-91b7-4563-ae20-5e02edec0ec2'; // LED, Button\n// User service characteristics\n\nvar LED_CHARACTERISTIC_UUID = 'E9062E71-9E62-4BC6-B0D3-35CDCD9B027B';\nvar BTN_CHARACTERISTIC_UUID = '62FBD229-6EDD-4D1A-B554-5C4E1BB29169'; // PSDI Service UUID: Fixed value for Developer Trial\n\nvar PSDI_SERVICE_UUID = 'E625601E-9E55-4597-A598-76018A0D293D'; // Device ID\n\nvar PSDI_CHARACTERISTIC_UUID = '26E2B12B-85F0-4F3F-9FDD-91D114270E6E'; // UI settings\n\nvar ledState = false; // true: LED on, false: LED off\n\nvar clickCount = 0; // -------------- //\n// On window load //\n// -------------- //\n\nwindow.onload = function () {\n  initializeApp();\n}; // ----------------- //\n// Handler functions //\n// ----------------- //\n\n\nfunction handlerToggleLed() {\n  ledState = !ledState;\n  uiToggleLedButton(ledState);\n  liffToggleDeviceLedState(ledState);\n} // ------------ //\n// UI functions //\n// ------------ //\n\n\nfunction uiToggleLedButton(state) {\n  var el = document.getElementById(\"btn-led-toggle\");\n  el.innerText = state ? \"Switch LED OFF\" : \"Switch LED ON\";\n\n  if (state) {\n    el.classList.add(\"led-on\");\n  } else {\n    el.classList.remove(\"led-on\");\n  }\n}\n\nfunction uiCountPressButton() {\n  clickCount++;\n  var el = document.getElementById(\"click-count\");\n  el.innerText = clickCount;\n}\n\nfunction uiToggleStateButton(pressed) {\n  var el = document.getElementById(\"btn-state\");\n\n  if (pressed) {\n    el.classList.add(\"pressed\");\n    el.innerText = \"Pressed\";\n  } else {\n    el.classList.remove(\"pressed\");\n    el.innerText = \"Released\";\n  }\n}\n\nfunction uiToggleDeviceConnected(connected) {\n  var elStatus = document.getElementById(\"status\");\n  var elControls = document.getElementById(\"controls\");\n  elStatus.classList.remove(\"error\");\n\n  if (connected) {\n    // Hide loading animation\n    uiToggleLoadingAnimation(false); // Show status connected\n\n    elStatus.classList.remove(\"inactive\");\n    elStatus.classList.add(\"success\");\n    elStatus.innerText = \"Device connected\"; // Show controls\n\n    elControls.classList.remove(\"hidden\");\n  } else {\n    // Show loading animation\n    uiToggleLoadingAnimation(true); // Show status disconnected\n\n    elStatus.classList.remove(\"success\");\n    elStatus.classList.add(\"inactive\");\n    elStatus.innerText = \"Device disconnected\"; // Hide controls\n\n    elControls.classList.add(\"hidden\");\n  }\n}\n\nfunction uiToggleLoadingAnimation(isLoading) {\n  var elLoading = document.getElementById(\"loading-animation\");\n\n  if (isLoading) {\n    // Show loading animation\n    elLoading.classList.remove(\"hidden\");\n  } else {\n    // Hide loading animation\n    elLoading.classList.add(\"hidden\");\n  }\n}\n\nfunction uiStatusError(message, showLoadingAnimation) {\n  uiToggleLoadingAnimation(showLoadingAnimation);\n  var elStatus = document.getElementById(\"status\");\n  var elControls = document.getElementById(\"controls\"); // Show status error\n\n  elStatus.classList.remove(\"success\");\n  elStatus.classList.remove(\"inactive\");\n  elStatus.classList.add(\"error\");\n  elStatus.innerText = message; // Hide controls\n\n  elControls.classList.add(\"hidden\");\n}\n\nfunction makeErrorMsg(errorObj) {\n  return \"Error\\n\" + errorObj.code + \"\\n\" + errorObj.message;\n} // -------------- //\n// LIFF functions //\n// -------------- //\n\n\nfunction initializeApp() {\n  liff.init(function () {\n    return initializeLiff();\n  }, function (error) {\n    return uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction initializeLiff() {\n  liff.initPlugins(['bluetooth']).then(function () {\n    liffCheckAvailablityAndDo(function () {\n      return liffRequestDevice();\n    });\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction liffCheckAvailablityAndDo(callbackIfAvailable) {\n  // Check Bluetooth availability\n  liff.bluetooth.getAvailability().then(function (isAvailable) {\n    if (isAvailable) {\n      uiToggleDeviceConnected(false);\n      callbackIfAvailable();\n    } else {\n      uiStatusError(\"Bluetooth not available\", true);\n      setTimeout(function () {\n        return liffCheckAvailablityAndDo(callbackIfAvailable);\n      }, 10000);\n    }\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n  ;\n}\n\nfunction liffRequestDevice() {\n  liff.bluetooth.requestDevice().then(function (device) {\n    liffConnectToDevice(device);\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction liffConnectToDevice(device) {\n  device.gatt.connect().then(function () {\n    document.getElementById(\"device-name\").innerText = device.name;\n    document.getElementById(\"device-id\").innerText = device.id; // Show status connected\n\n    uiToggleDeviceConnected(true); // Get service\n\n    device.gatt.getPrimaryService(USER_SERVICE_UUID).then(function (service) {\n      liffGetUserService(service);\n    }).catch(function (error) {\n      uiStatusError(makeErrorMsg(error), false);\n    });\n    device.gatt.getPrimaryService(PSDI_SERVICE_UUID).then(function (service) {\n      liffGetPSDIService(service);\n    }).catch(function (error) {\n      uiStatusError(makeErrorMsg(error), false);\n    }); // Device disconnect callback\n\n    var disconnectCallback = function disconnectCallback() {\n      // Show status disconnected\n      uiToggleDeviceConnected(false); // Remove disconnect callback\n\n      device.removeEventListener('gattserverdisconnected', disconnectCallback); // Reset LED state\n\n      ledState = false; // Reset UI elements\n\n      uiToggleLedButton(false);\n      uiToggleStateButton(false); // Try to reconnect\n\n      initializeLiff();\n    };\n\n    device.addEventListener('gattserverdisconnected', disconnectCallback);\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction liffGetUserService(service) {\n  // Button pressed state\n  service.getCharacteristic(BTN_CHARACTERISTIC_UUID).then(function (characteristic) {\n    liffGetButtonStateCharacteristic(characteristic);\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  }); // Toggle LED\n\n  service.getCharacteristic(LED_CHARACTERISTIC_UUID).then(function (characteristic) {\n    window.ledCharacteristic = characteristic; // Switch off by default\n\n    liffToggleDeviceLedState(false);\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction liffGetPSDIService(service) {\n  // Get PSDI value\n  service.getCharacteristic(PSDI_CHARACTERISTIC_UUID).then(function (characteristic) {\n    return characteristic.readValue();\n  }).then(function (value) {\n    // Byte array to hex string\n    var psdi = new Uint8Array(value.buffer).reduce(function (output, byte) {\n      return output + (\"0\" + byte.toString(16)).slice(-2);\n    }, \"\");\n    document.getElementById(\"device-psdi\").innerText = psdi;\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction liffGetButtonStateCharacteristic(characteristic) {\n  // Add notification hook for button state\n  // (Get notified when button state changes)\n  characteristic.startNotifications().then(function () {\n    characteristic.addEventListener('characteristicvaluechanged', function (e) {\n      console.log(e);\n      var val = new Uint8Array(e.target.value.buffer)[0];\n\n      if (val > 0) {\n        // press\n        uiToggleStateButton(true);\n      } else {\n        // release\n        uiToggleStateButton(false);\n        uiCountPressButton();\n        kintonePostRecord();\n      }\n    });\n  }).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction liffToggleDeviceLedState(state) {\n  // on: 0x01\n  // off: 0x00\n  window.ledCharacteristic.writeValue(state ? new Uint8Array([0x01]) : new Uint8Array([0x00])).catch(function (error) {\n    uiStatusError(makeErrorMsg(error), false);\n  });\n}\n\nfunction kintonePostRecord() {\n  // JS SDKのコネクションとか\n  var kintoneAuth = new kintoneJSSDK.Auth();\n  var apiToken = 'RuEDdPDKyOcDeaSCj4cmgIWEr8hyij1nuavCROdX';\n  kintoneAuth.setApiToken(apiToken);\n  var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);\n  var kintoneRecord = new kintoneJSSDK.Record(kintoneConnection);\n  var params = {\n    text: {\n      value: 'hogehoge'\n    }\n  };\n  kintoneRecord.addRecord(635, params);\n}\n\n//# sourceURL=webpack:///./liff.js?");

/***/ })

/******/ });
=======
const kintoneJSSDK = require('./kintone-js-sdk.min.js');
// User service UUID: Change this to your generated service UUID
const USER_SERVICE_UUID         = 'd6d379f5-91b7-4563-ae20-5e02edec0ec2'; // LED, Button
// User service characteristics
const LED_CHARACTERISTIC_UUID   = 'E9062E71-9E62-4BC6-B0D3-35CDCD9B027B';
const BTN_CHARACTERISTIC_UUID   = '62FBD229-6EDD-4D1A-B554-5C4E1BB29169';

// PSDI Service UUID: Fixed value for Developer Trial
const PSDI_SERVICE_UUID         = 'E625601E-9E55-4597-A598-76018A0D293D'; // Device ID
const PSDI_CHARACTERISTIC_UUID  = '26E2B12B-85F0-4F3F-9FDD-91D114270E6E';

// UI settings
let ledState = false; // true: LED on, false: LED off
let clickCount = 0;

// -------------- //
// On window load //
// -------------- //

window.onload = () => {
    initializeApp();
};

// ----------------- //
// Handler functions //
// ----------------- //

function handlerToggleLed() {
    ledState = !ledState;

    uiToggleLedButton(ledState);
    liffToggleDeviceLedState(ledState);
}

// ------------ //
// UI functions //
// ------------ //

function uiToggleLedButton(state) {
    const el = document.getElementById("btn-led-toggle");
    el.innerText = state ? "Switch LED OFF" : "Switch LED ON";

    if (state) {
      el.classList.add("led-on");
    } else {
      el.classList.remove("led-on");
    }
}

function uiCountPressButton() {
    clickCount++;

    const el = document.getElementById("click-count");
    el.innerText = clickCount;
}

function uiToggleStateButton(pressed) {
    const el = document.getElementById("btn-state");

    if (pressed) {
        el.classList.add("pressed");
        el.innerText = "Pressed";
    } else {
        el.classList.remove("pressed");
        el.innerText = "Released";
    }
}

function uiToggleDeviceConnected(connected) {
    const elStatus = document.getElementById("status");
    const elControls = document.getElementById("controls");

    elStatus.classList.remove("error");

    if (connected) {
        // Hide loading animation
        uiToggleLoadingAnimation(false);
        // Show status connected
        elStatus.classList.remove("inactive");
        elStatus.classList.add("success");
        elStatus.innerText = "Device connected";
        // Show controls
        elControls.classList.remove("hidden");
    } else {
        // Show loading animation
        uiToggleLoadingAnimation(true);
        // Show status disconnected
        elStatus.classList.remove("success");
        elStatus.classList.add("inactive");
        elStatus.innerText = "Device disconnected";
        // Hide controls
        elControls.classList.add("hidden");
    }
}

function uiToggleLoadingAnimation(isLoading) {
    const elLoading = document.getElementById("loading-animation");

    if (isLoading) {
        // Show loading animation
        elLoading.classList.remove("hidden");
    } else {
        // Hide loading animation
        elLoading.classList.add("hidden");
    }
}

function uiStatusError(message, showLoadingAnimation) {
    uiToggleLoadingAnimation(showLoadingAnimation);

    const elStatus = document.getElementById("status");
    const elControls = document.getElementById("controls");

    // Show status error
    elStatus.classList.remove("success");
    elStatus.classList.remove("inactive");
    elStatus.classList.add("error");
    elStatus.innerText = message;

    // Hide controls
    elControls.classList.add("hidden");
}

function makeErrorMsg(errorObj) {
    return "Error\n" + errorObj.code + "\n" + errorObj.message;
}

// -------------- //
// LIFF functions //
// -------------- //

function initializeApp() {
    liff.init(() => initializeLiff(), error => uiStatusError(makeErrorMsg(error), false));
}

function initializeLiff() {
    liff.initPlugins(['bluetooth']).then(() => {
        liffCheckAvailablityAndDo(() => liffRequestDevice());
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });
}

function liffCheckAvailablityAndDo(callbackIfAvailable) {
    // Check Bluetooth availability
    liff.bluetooth.getAvailability().then(isAvailable => {
        if (isAvailable) {
            uiToggleDeviceConnected(false);
            callbackIfAvailable();
        } else {
            uiStatusError("Bluetooth not available", true);
            setTimeout(() => liffCheckAvailablityAndDo(callbackIfAvailable), 10000);
        }
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });;
}

function liffRequestDevice() {
    liff.bluetooth.requestDevice().then(device => {
        liffConnectToDevice(device);
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });
}

function liffConnectToDevice(device) {
    device.gatt.connect().then(() => {
        document.getElementById("device-name").innerText = device.name;
        document.getElementById("device-id").innerText = device.id;

        // Show status connected
        uiToggleDeviceConnected(true);

        // Get service
        device.gatt.getPrimaryService(USER_SERVICE_UUID).then(service => {
            liffGetUserService(service);
        }).catch(error => {
            uiStatusError(makeErrorMsg(error), false);
        });
        device.gatt.getPrimaryService(PSDI_SERVICE_UUID).then(service => {
            liffGetPSDIService(service);
        }).catch(error => {
            uiStatusError(makeErrorMsg(error), false);
        });

        // Device disconnect callback
        const disconnectCallback = () => {
            // Show status disconnected
            uiToggleDeviceConnected(false);

            // Remove disconnect callback
            device.removeEventListener('gattserverdisconnected', disconnectCallback);

            // Reset LED state
            ledState = false;
            // Reset UI elements
            uiToggleLedButton(false);
            uiToggleStateButton(false);

            // Try to reconnect
            initializeLiff();
        };

        device.addEventListener('gattserverdisconnected', disconnectCallback);
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });
}

function liffGetUserService(service) {
    // Button pressed state
    service.getCharacteristic(BTN_CHARACTERISTIC_UUID).then(characteristic => {
        liffGetButtonStateCharacteristic(characteristic);
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });

    // Toggle LED
    service.getCharacteristic(LED_CHARACTERISTIC_UUID).then(characteristic => {
        window.ledCharacteristic = characteristic;

        // Switch off by default
        liffToggleDeviceLedState(false);
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });
}

function liffGetPSDIService(service) {
    // Get PSDI value
    service.getCharacteristic(PSDI_CHARACTERISTIC_UUID).then(characteristic => {
        return characteristic.readValue();
    }).then(value => {
        // Byte array to hex string
        const psdi = new Uint8Array(value.buffer)
            .reduce((output, byte) => output + ("0" + byte.toString(16)).slice(-2), "");
        document.getElementById("device-psdi").innerText = psdi;
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });
}

function liffGetButtonStateCharacteristic(characteristic) {
    // Add notification hook for button state
    // (Get notified when button state changes)
    characteristic.startNotifications().then(() => {
        characteristic.addEventListener('characteristicvaluechanged', e => {
            console.log(e);
            const val = (new Uint8Array(e.target.value.buffer))[0];
            if (val > 0) {
                // press
                uiToggleStateButton(true);
                kintonePostRecord();
            } else {
                // release
                uiToggleStateButton(false);
                uiCountPressButton();
                kintonePostRecord();
            }
        });
    }).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });
}

function liffToggleDeviceLedState(state) {
    // on: 0x01
    // off: 0x00
    window.ledCharacteristic.writeValue(
        state ? new Uint8Array([0x01]) : new Uint8Array([0x00])
    ).catch(error => {
        uiStatusError(makeErrorMsg(error), false);
    });
}

function kintonePostRecord() {
    // JS SDKのコネクションとか
    var kintoneAuth = new kintoneJSSDK.Auth();
    var apiToken = 'RuEDdPDKyOcDeaSCj4cmgIWEr8hyij1nuavCROdX';
    kintoneAuth.setApiToken(apiToken);
    var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);
    const kintoneRecord = new kintoneJSSDK.Record(kintoneConnection);
    kintoneRecord.addRecord(635);
}
