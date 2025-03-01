"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavHelper = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class NavHelper {
    constructor() {
        this.browser = null;
        this.page = null;
    }
    createBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.browser = yield puppeteer_1.default.launch({ headless: false });
                this.page = yield this.browser.newPage();
            }
            catch (Exception) {
                throw (Exception.toString());
            }
        });
    }
    goTo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('navigating to ' + url);
            yield this.page.goto(url);
        });
    }
    clickOn(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.$x(element).then((ele) => __awaiter(this, void 0, void 0, function* () { return yield ele[0].click(); }));
        });
    }
    waitUtilVisible(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForXPath(element);
        });
    }
    enterText(elementName, elementText) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.$x(elementName).then((ele) => __awaiter(this, void 0, void 0, function* () { return yield ele[0].type(elementText); }));
        });
    }
    extractTableData(headerElements, cellElements) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableHash = new Map();
            let headersList = [];
            //Get table headers
            const headers = yield this.page.$x(headerElements);
            for (let i = 0; i < headers.length; i++) {
                headersList.push(yield this.page.evaluate(el => el.innerText, headers[i]));
            }
            //Get table cell values
            //Map cell values to table headers
            for (let i = 0; i < headersList.length; i++) {
                let cellValuesLists = [];
                const cellValues = yield this.page.$x(cellElements + `[${i + 1}]`);
                for (let j = 0; j < cellValues.length; j++) {
                    cellValuesLists.push(yield this.page.evaluate(el => el.innerText, cellValues[j]));
                }
                tableHash.set(headersList[i], cellValuesLists);
            }
            return tableHash;
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('closing browser');
            yield this.browser.close();
        });
    }
}
exports.NavHelper = NavHelper;
//# sourceMappingURL=NavHelper.js.map