const { browser, element, $ } = require("protractor");
var landingPage = require("../pages/landingPage");
var giftCardPage = require("../pages/giftCardPage");
var checkoutPage = require("../pages/checkoutPage");

describe("Validate Macy's Gift Card purchase flow - Regression Test", () => {
  it("Navigate to Macy's website ", () => {
    browser.get(baseUrl);
    browser.sleep(SLEEP_TIME);
    expect(browser.getTitle()).toEqual(
      "Macy's - Shop Fashion Clothing & Accessories - Official Site - Macys.com"
    );
    landingPage.waitToBeClickable(
      landingPage.giftsDropdown,
      WAIT_TIME,
      "Gift Card Selection Page is not displayed"
    );
    browser.manage().deleteAllCookies();
  });
  it("Navigate to Gift Card Selection section ", () => {
    browser.actions().mouseMove(landingPage.giftsDropdown).perform();
    landingPage.waitToBeClickable(
      landingPage.giftCardOptn,
      WAIT_TIME,
      "Gift Card Option is not displayed"
    );
    landingPage.giftCardOptn.click();
    landingPage.waitToBeClickable(
      landingPage.giftCardIcon,
      WAIT_TIME,
      "Gift Card Selection Page is not displayed"
    );
    expect(browser.getTitle()).toEqual(
      "Gift Cards, E-Gift Cards & Gift Certificates - Macy's"
    );
    browser.manage().deleteAllCookies();
  });
  it("Navigate to Gift Card Details Page ", () => {
    landingPage.eGiftCardIcon.getLocation().then( val =>{
    browser.actions().mouseMove({ x: val.y, y: val.x }).doubleClick().perform();
    });
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      giftCardPage.valueTextbox,
      WAIT_TIME,
      "Gift Card Details is not displayed"
    );
    browser.manage().deleteAllCookies();
  });
  it("Validating if price value error is displayed when a blank value is given ", () => {
    giftCardPage.valueTextbox.click();
    //Click outside the box
    giftCardPage.chooseValHdr.click();
    landingPage.waitToBeVisible(
      giftCardPage.priceError,
      WAIT_TIME,
      "Value Error Message is not displayed"
    );
    giftCardPage.validateError(
      giftCardPage.priceError,
      "Please use an amount from $10 to $1,000"
    );
  });
  it("Validating if price value error is displayed when price is less than 10 ", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "9.99");
    expect(giftCardPage.priceError.isDisplayed()).toEqual(
      true,
      "Price Error message is not displayed"
    );
  });
  it("Validating if price value error is displayed when price is greater than 1000 ", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "1000.01");
    expect(giftCardPage.priceError.isDisplayed()).toEqual(
      true,
      "Price Error message is not displayed"
    );
  });
  it("Validating if price value error is displayed when price has spaces ", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "1 1");
    expect(giftCardPage.priceError.isDisplayed()).toEqual(
      true,
      "Price Error message is not displayed"
    );
  });
  it("Validating if price value error is displayed when price has alphabets ", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "10abc");
    expect(giftCardPage.priceError.isDisplayed()).toEqual(
      true,
      "Price Error message is not displayed"
    );
  });
  it("Validating if price value error is displayed when price has special characters ", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "10*&^");
    expect(giftCardPage.priceError.isDisplayed()).toEqual(
      true,
      "Price Error message is not displayed"
    );
  });
  it("Click on Add to Cart with invalid price and validate the header error message is displayed ", () => {
    giftCardPage.addToBag.click();
    giftCardPage.validateError(
      giftCardPage.priceHdrError,
      "Price: Please Use An Amount From $10 To $1,000"
    );
  });
  it("Click on cross button of invalid price header message and validate whether it is closed ", () => {
    giftCardPage.errorsClose.click();
    expect(giftCardPage.priceHdrError.isPresent()).toEqual(
      false,
      "Price Error Header message is still displayed"
    );
  });
  it("Validating the price value error is not displayed for price between valid range ", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "500");
    expect(giftCardPage.priceError.isPresent()).toEqual(
      false,
      "Price Error message is displayed for correct price value"
    );
  });
  it("Validating whether default option is getting selected automatically when we give that value in textbox ", () => {
    giftCardPage.isSelected(
      element(by.buttonText("500")),
      "the value in the default options is not selected"
    );
  });
  it("Validate the quantity drop down default value and selecting another value ", () => {
    expect($('[value="1"]').isSelected()).toEqual(
      true,
      "The default quantity value is not 1"
    );
    element(by.cssContainingText("option", "6")).click();
    expect($('[value="6"]').isSelected()).toEqual(
      true,
      "the quantity value is not as expected"
    );
    browser.sleep(SLEEP_TIME);
  });
  it("Validating if to message error is displayed when we give special characters in To: field ", () => {
    giftCardPage.sendText(giftCardPage.toTextbox, "10*&^");
    landingPage.waitToBeVisible(
      giftCardPage.toError,
      WAIT_TIME,
      "To Error Message is not displayed"
    );
    giftCardPage.validateError(
      giftCardPage.toError,
      "You may use letters, numbers, exclamation points and periods."
    );
  });
  it("Validating if to message error is displayed when we give special characters in From: field ", () => {
    giftCardPage.sendText(giftCardPage.fromTextbox, "asv10*&^");
    landingPage.waitToBeVisible(
      giftCardPage.fromError,
      WAIT_TIME,
      "From Error Message is not displayed"
    );
    giftCardPage.validateError(
      giftCardPage.fromError,
      "You may use letters, numbers, exclamation points and periods."
    );
  });
  it("Validate message body should display error when special characters and only allows upto 100 characters ", () => {
    giftCardPage.sendText(giftCardPage.messageTextbox, "abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc$$");
    landingPage.waitToBeVisible(
      giftCardPage.msgError,
      WAIT_TIME,
      "From Error Message is not displayed"
    );
    giftCardPage.validateError(
      giftCardPage.msgError,
      "You may use letters, numbers, exclamation points and periods."
    );
    //Though the text length was greater that 100 characters, the textbox should take only first 100 characters
    giftCardPage.messageTextbox.getAttribute("value").then((val) => {
      expect(val).toEqual(
        "abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc$",
        "The message body value is not as expected"
      );
    });
  });
  it("Click on Add to Cart with invalid message details ", () => {
    giftCardPage.addToBag.click();
    giftCardPage.validateError(
      giftCardPage.toHdrError,
      "To: You May Use Letters, Numbers, Exclamation Points And Periods."
    );
    giftCardPage.validateError(
      giftCardPage.fromHdrError,
      "From: You May Use Letters, Numbers, Exclamation Points And Periods."
    );
    giftCardPage.validateError(
      giftCardPage.msgHdrError,
      "Message: Your Gift Message Can Contain Up To 100 Characters. You May Use Letters, Numbers, Exclamation Points And Periods."
    );
  });
  it("Enter blank message details and should be able to add to bag", () => {
    giftCardPage.sendText(giftCardPage.toTextbox, "");
    giftCardPage.sendText(giftCardPage.fromTextbox, "");
    giftCardPage.sendText(giftCardPage.messageTextbox, "");
    browser.sleep(SLEEP_TIME);
  });
  it("Click on Add to Cart with valid giftcard details ", () => {
    giftCardPage.addToBag.click();
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      giftCardPage.viewBag,
      WAIT_TIME,
      "View bag and checkout page is not displayed"
    );
  });
  it("Validate the items count and subtotal ", () => {
    giftCardPage.itemsInBag.getText().then((text) => {
      expect(text).toEqual(
        "6 item(s) in bag",
        "Number for items in bag is not as expected "
      );
    });
    giftCardPage.subtotal.getText().then((text) => {
      expect(text).toEqual(
        "subtotal: $3,000.00",
        "Number for items in bag is not as expected "
      );
    });
  });
  it("Validate Continue Shopping button navigated back to gift details page ", () => {
    giftCardPage.continueShopping.click();
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      giftCardPage.valueTextbox,
      WAIT_TIME,
      "Continue Shopping button did not navigate back to gift detials page"
    );
  });
  it("Enter few more gift cards", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "500");
    element(by.cssContainingText("option", "4")).click();
    browser.sleep(SLEEP_TIME);
  });
  it("Click on Add to Cart with valid price ", () => {
    giftCardPage.addToBag.click();
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      giftCardPage.viewBag,
      WAIT_TIME,
      "View bag and checkout page is not displayed"
    );
  });
  it("Click on View Bag button ", () => {
    giftCardPage.viewBag.click();
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      checkoutPage.total,
      WAIT_TIME,
      "Shopping Bag Page is not displayed"
    );
    browser.manage().deleteAllCookies();
    browser.sleep(SLEEP_TIME);
  });
  it("Remove an Item and validate the quantity of cards decreased and also the total price is as expected ", () => {
    checkoutPage.removeItem.get(0).click();
    browser.sleep(SLEEP_TIME);
    expect(checkoutPage.removeItem.count()).toEqual(
      9,
      "Number for items in shopping bag page is not as expected "
    );
    checkoutPage.total.getText().then((text) => {
      expect(text).toEqual(
        "$4,500.00",
        "Pretax order total is not as expected "
      );
    });
  });
  it("Click on Proceed to Checkout button ", () => {
    checkoutPage.checkout.click();
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      checkoutPage.checkoutAsGuest,
      WAIT_TIME,
      "Checkout as guest Page is not displayed"
    );
  });
  it("Click on Checkout As Guest button ", () => {
    checkoutPage.checkoutAsGuest.click();
    landingPage.waitToBeVisible(
      checkoutPage.firstName,
      WAIT_TIME,
      "Shipping Page is not displayed"
    );
  });
  it("Validate Place Order Button is disabled unless the shipping and payment details are filled ", () => {
    expect(checkoutPage.placeOrder.isEnabled()).toEqual(
      false,
      "Place Order Button is enabled"
    );
  });
  it("Click on continue button without filling details ", () => {
    checkoutPage.shippingContinue.click();
    landingPage.waitToBeVisible(
      checkoutPage.firstNameErr,
      WAIT_TIME,
      "Errors are not displayed for Shipping"
    );
  });
  it("Validate Shipping Errors are displayed for all required fields ", () => {
    giftCardPage.validateError(
      checkoutPage.firstNameErr,
      "Please enter a first name."
    );
    giftCardPage.validateError(
      checkoutPage.lastNameErr,
      "Please enter a last name."
    );
    giftCardPage.validateError(
      checkoutPage.Address1Err,
      "Please enter a street address."
    );
    giftCardPage.validateError(
      checkoutPage.zipErr,
      "Please enter a ZIP code."
    );
    giftCardPage.validateError(
      checkoutPage.stateErr,
      "Please enter a state."
    );
    giftCardPage.validateError(
      checkoutPage.cityErr,
      "Please enter a city."
    );
    giftCardPage.validateError(
      checkoutPage.phoneNumberErr,
      "Please enter a phone number."
    );
  });
  it("Validate Address2 Error is not displayed as it is not required ", () => {
    expect(checkoutPage.Address2Err.isPresent()).toEqual(
      false,
      "Address2 Error is displayed for blank value"
    );
  });
  it("Fill in invalid Shipping details and click continue ", () => {
    checkoutPage.firstName.sendKeys("Nikhila@#$");
    checkoutPage.lastName.sendKeys("Godugu$%2");
    checkoutPage.Address1.sendKeys("310 Crescent Village Cir, Apt 1314");
    checkoutPage.Address2.sendKeys("NDs$");
    checkoutPage.zip.sendKeys("ac9513456");
    element(by.cssContainingText("option", "VA")).click();
    checkoutPage.city.sendKeys("San Jose#%");
    checkoutPage.phoneNumber.sendKeys("ab");
    checkoutPage.shippingContinue.click();
  });
  it("Validate Shipping Errors are displayed for invalid entries ", () => {
    giftCardPage.validateError(
      checkoutPage.firstNameErr,
      "Please remove any special characters."
    );
    giftCardPage.validateError(
      checkoutPage.lastNameErr,
      "Please remove any special characters."
    );
    giftCardPage.validateError(
      checkoutPage.Address1Err,
      "Please remove any special characters."
    );
    giftCardPage.validateError(
      checkoutPage.Address2Err,
      "Please remove any special characters."
    );
    giftCardPage.validateError(
      checkoutPage.cityErr,
      "Please enter a city."
    );
    giftCardPage.validateError(
      checkoutPage.phoneNumberErr,
      "Please enter a valid 10-digit phone number."
    );
  });
  it("Validate the phone Number and zip values ", () => {
    //Phone number field should not print alphabets when given
    checkoutPage.phoneNumber.getAttribute("value").then((val) => {
      expect(val).toEqual(
        "(",
        "The phone numver value is not as expected"
      );
    });
    //Though Zip code was given more than 5 numbers and letters, the field shouldnt allow extra numbers
    checkoutPage.zip.getAttribute("value").then((val) => {
      expect(val).toEqual(
        "95134",
        "The zip value is not as expected"
      );
    });
  });
  it("Fill correct Shipping details and click continue ", () => {
    checkoutPage.firstName.sendKeys("Nikhila");
    checkoutPage.lastName.sendKeys("Godugu");
    checkoutPage.Address1.sendKeys("310 Crescent Village Cir");
    checkoutPage.Address2.sendKeys("Apt 1314");
    checkoutPage.zip.sendKeys("95134");
    element(by.cssContainingText("option", "CA")).click();
    checkoutPage.city.sendKeys("San Jose");
    checkoutPage.phoneNumber.sendKeys("5713591991");
    checkoutPage.shippingContinue.click();
    landingPage.waitToBeVisible(
      checkoutPage.groupContinue,
      WAIT_TIME,
      "Group Continue is not displayed in Final Checkout page"
    );
  });
  it("Validate the Shipping Address summary ", () => {
    checkoutPage.shippingSummary.getText().then(text => {
      expect(text).toEqual("Nikhila Godugu\n310 Crescent Village Cir\nApt 1314\nSan Jose\n(571) 359-1991")
    })
  });
  it("Click on Edit Shipping button ", () => {
    checkoutPage.shippingEdit.click();
    landingPage.waitToBeVisible(
      checkoutPage.firstNameErr,
      WAIT_TIME,
      "Shipping Edit is not working as expected"
    );
  });
  it("Re Click shipping continue button ", () => {
    checkoutPage.shippingContinue.click();
    landingPage.waitToBeVisible(
      checkoutPage.groupContinue,
      WAIT_TIME,
      "Group continue button is not displayed"
    );
  });
  it("Click on group continue button ", () => {
    checkoutPage.groupContinue.click();
    landingPage.waitToBeVisible(
      checkoutPage.cardType,
      WAIT_TIME,
      "Payment Details are displayed"
    );
  });
  it("Click on continue button without payment details ", () => {
    checkoutPage.paymentContinue.click();
    landingPage.waitToBeVisible(
      checkoutPage.cardTypeErr,
      WAIT_TIME,
      "Errors are not displayed for Paymemt"
    );
  });
  it("Validate Payment Errors for all required fields ", () => {
    giftCardPage.validateError(
      checkoutPage.cardTypeErr,
      "Please select a card type."
    );
    giftCardPage.validateError(
      checkoutPage.cardNumberErr,
      "Please enter a card number."
    );
    giftCardPage.validateError(
      checkoutPage.emailErr,
      "Please enter an email address."
    );
  });
  it("Fill in invalid Payment details and click continue ", () => {
    element(by.cssContainingText("option", "American Express")).click();
    checkoutPage.cardNumber.sendKeys("abc3792 801722 91111452");
    element(by.cssContainingText("option", "01")).click();
    element(by.cssContainingText("option", "2020")).click();
    checkoutPage.code.sendKeys("abc123456");
    checkoutPage.email.sendKeys("nikhila");
    checkoutPage.paymentContinue.click();
  });
  it("Validate Payment Errors for invalid data ", () => {
    giftCardPage.validateError(
      checkoutPage.cardMothErr,
      "Please enter a valid expiration date."
    );
    giftCardPage.validateError(
      checkoutPage.emailErr,
      "Please enter a valid email address."
    );
  });
  it("Validate the Card Number and code values ", () => {
    //Card number field should not print alphabets and more than card number length
    checkoutPage.phoneNumber.getAttribute("value").then((val) => {
      expect(val).toEqual(
        "3792 801722 91111",
        "The card numver value is not as expected"
      );
    });
    //Code should not print more than 5 numbers and letters
    checkoutPage.code.getAttribute("value").then((val) => {
      expect(val).toEqual(
        "1234",
        "The code value is not as expected"
      );
    });
  });
  it("Validate the phone Number and Address have been copied to Payment Section ", () => {
    checkoutPage.paymentPhoneNumber.getAttribute("value").then((val) => {
      expect(val).toEqual(
        "(571) 359-1991",
        "The phone was not copied correctly to payment section"
      );
    });
    expect(checkoutPage.useShipping.isSelected()).toEqual(
      true,
      "Use shipping has not been selected by default"
    );
    checkoutPage.useShippingAddr.getText().then((text) => {
      expect(text).toEqual(
        "Nikhila Godugu\n310 Crescent Village Cir Apt 1115\nSan Jose, CA 95134",
        "The address was not copied correctly to payment section"
      );
    });
  });
  it("Validate unchecking the use shipping address checkbox displays payment address section ", () => {
    checkoutPage.useShipping.click();
    expect(checkoutPage.paymentFirstName.isDisplayed()).toEqual(
      true,
      "Payment Address section is not displayed"
    );
  });
  it("Fill Payment details and click continue ", () => {
    element(by.cssContainingText("option", "American Express")).click();
    checkoutPage.cardNumber.sendKeys("3792 801722 91111");
    element(by.cssContainingText("option", "04")).click();
    element(by.cssContainingText("option", "2024")).click();
    checkoutPage.code.sendKeys("1234");
    checkoutPage.email.sendKeys("nikhila.godugu1@gmail.com");
    checkoutPage.useShipping.click();
    checkoutPage.paymentContinue.click();
  });
  it("Validate Place Order Button is enabled ", () => {
    expect(checkoutPage.placeOrder.isEnabled()).toEqual(
      true,
      "Place Order Button is disabled"
    );
  });
  it("Click on PayPal Tab and validate phone number is prepopulated ", () => {
    checkoutPage.payPalTab.click();
    landingPage.waitToBeVisible(
      checkoutPage.email,
      WAIT_TIME,
      "Email textbox is not displayed"
    );
    checkoutPage.paymentPhoneNumber.getAttribute("value").then((val) => {
      expect(val).toEqual(
        "(571) 359-1991",
        "The phone was not copied correctly to payment section"
      );
    });
  });
  it("Type email address, click continue to Paypal and validate navigation to paypal landing page", () => {
    checkoutPage.email.sendKeys("nikhila.godugu1@gmail.com");
    checkoutPage.payPalContinue.click();
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      checkoutPage.payPalLanding,
      WAIT_TIME,
      "Paypal landing page is not displayed"
    );
    expect(browser.getTitle()).toEqual("Log in to your PayPal account");
  });
});
