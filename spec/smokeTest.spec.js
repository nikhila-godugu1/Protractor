const { browser, element } = require("protractor");
var landingPage = require("../pages/landingPage");
var giftCardPage = require("../pages/giftCardPage");
var checkoutPage = require("../pages/checkoutPage");

describe("Validate Macy's Gift Card purchase flow - Smoke Test ", () => {
  it("Navigate to Macy's website ", () => {
    browser.get(baseUrl);
    browser.sleep(SLEEP_TIME);
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
  it("Enter gift card price and quantity ", () => {
    giftCardPage.sendText(giftCardPage.valueTextbox, "500");
    element(by.cssContainingText("option", "6")).click();
  });
  it("Enter Message details ", () => {
    giftCardPage.sendText(giftCardPage.toTextbox, "Hubby");
    giftCardPage.sendText(giftCardPage.fromTextbox, "Nikhila");
    giftCardPage.sendText(giftCardPage.messageTextbox, "Hi!");
    browser.sleep(SLEEP_TIME);
  });
  it("Click on Add to Cart ", () => {
    giftCardPage.addToBag.click();
    browser.sleep(5000);
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
    browser.sleep(SLEEP_TIME);
    landingPage.waitToBeVisible(
      checkoutPage.firstName,
      WAIT_TIME,
      "Shipping Page is not displayed"
    );
  });
  it("Fill Shipping details and click continue ", () => {
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
  it("Click on group continue button ", () => {
    checkoutPage.groupContinue.click();
    landingPage.waitToBeVisible(
      checkoutPage.cardType,
      WAIT_TIME,
      "Payment Details are displayed"
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
});
