var giftCardPage = function () {
  this.valueTextbox = element(by.id("giftPrice"));
  this.quantity = element(by.id("giftQuantity"));
  this.priceError = element(by.id("giftPrice-error"));
  this.priceValues = $$('[class*="transparent egift-pr-btn"]');
  this.toTextbox = element(by.id("giftTo"));
  this.fromTextbox = element(by.id("giftFrom"));
  this.messageTextbox = element(by.id("giftMessage"));
  this.toError = element(by.id("giftTo-error"));
  this.fromError = element(by.id("giftFrom-error"));
  this.msgError = element(by.id("giftFrom-error"));
  this.addToBag = element(by.id("giftSubmit"));
  this.toHdrError = element(by.id("profile_giftTo_error_li"));
  this.fromHdrError = element(by.id("profile_giftFrom_error_li"));
  this.msgHdrError = element(by.id("profile_giftMessage_error_li"));
  this.priceHdrError = element(by.id("profile_giftPrice_error_li"));
  this.errorsClose = $('[class*="notification-action-button"]');
  this.chooseValHdr = $('[for="giftPrice"]');
  this.viewBag = element(by.id("atbIntViewBagAndCheckout"));
  this.itemsInBag = $('[data-auto="items-in-bag"]');
  this.subtotal = $('[data-auto="subtotal"]');
  this.continueShopping = element(by.id("atbIntContinueShopping"));
  this.shoppingBag = element(by.id("m-bag-count-anchor"));
  this.shoppingBagVal = $('[id="m-bag-count-anchor"] [id="bagCount"]');
  this.removeBtn = element.all(by.buttonText("Remove"));

  this.sendText = (element, text) => {
    element.clear();
    element.sendKeys(text);
    this.chooseValHdr.click();
  };
  this.isSelected = (element, errMsg) => {
    element.getAttribute("class").then((val) => {
      expect(val.indexOf("selected")).not.toEqual(-1, errMsg);
    });
  };
  this.validateError = (errorElement, textVal) => {
    expect(errorElement.isDisplayed()).toEqual(
      true,
      "Price Error message is not displayed"
    );
    errorElement.getText().then((text) => {
      expect(text).toEqual(
        textVal,
        "The value error message is not as expected "
      );
    });
  };
};
module.exports = new giftCardPage();
