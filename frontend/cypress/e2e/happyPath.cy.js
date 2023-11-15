describe("happy path", () => {
  it("should navigate to home screen successfully", () => {
    cy.visit("localhost:3000/");
    // check url match
    cy.url().should("include", "localhost:3000/");
    // check login and signup button exist
    cy.get('button[name="register-btn"]').should("be.visible");
    cy.get('button[name="login-btn"]').should("be.visible");
    cy.get('button[name="logout-btn"]').should("not.be.exist");
  });

  it("should navigate to register screen successfully", () => {
    cy.get('button[name="register-btn"]').click();
    // check url match
    cy.url().should("include", "localhost:3000/register");
  });

  it("should register first user successfully", () => {
    cy.get('input[name="email"]').focus().type("randomEmail@email.com");

    cy.get('input[name="name"]').focus().type("randomUser");

    cy.get('input[name="password"]').focus().type("randomPassword123");

    cy.get('input[name="confirm"]').focus().type("randomPassword123");

    cy.get('button[name="submit"]').click();
    // check url match
    cy.url().should("include", "localhost:3000/");
    // check login and register button does not exist
    cy.get('button[name="register-btn"]').should("not.be.exist");
    cy.get('button[name="login-btn"]').should("not.be.exist");
    // check logout button, hosted listings button, all listings button exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
  });

  it("should navigate to hosted page successfully", () => {
    cy.get('a[name="hosted-link"]').click();
    // check url match
    cy.url().should("include", "localhost:3000/hosted");
    // check logout button, hosted listings button, all listings button exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
  });

  it("should create a listing successfully", () => {
    // check there is no listing before creation
    cy.get("#hosted0").should("not.be.exist");

    cy.get('button[name="create-list"]').click();

    cy.get('input[name="title"]').focus().type("randomTitle");

    cy.get('input[name="country"]').focus().type("Australia");

    cy.get('input[name="city"]').focus().type("Sydney");

    cy.get('input[name="street"]').focus().type("Kingsford");

    cy.get('input[name="postcode"]').focus().type("2032");

    cy.get('input[name="bath"]').focus().type("3");

    cy.get('input[name="price"]').focus().type("220");

    cy.get('input[name="prop"]').click();
    cy.contains("li", "House").click();

    cy.get("#bedNumberInput0").click();
    cy.contains("li", "3").click();

    cy.get("#roomTypeInput0").click();
    cy.contains("li", "Private room").click();

    cy.get('input[name="amen"]').click();
    cy.contains("li", "Wifi").click();
    cy.contains("li", "Oven").click();

    cy.get('input[name="youtube"]')
      .focus()
      .type("https://youtube.com/watch?v=dQw4w9WgXcQ");

    cy.get('input[name="photo"]').selectFile("src/assets/1.jpg", {
      force: true,
    });
    cy.get('button[name="submit"]').click();

    // check 1 listing exist after creation
    cy.get("#hosted0").should("be.visible");
  });

  it("should edit a listing successfully", () => {
    cy.get('button[name="edit-list0"]').click();
    // check url
    cy.url().should("include", "localhost:3000/hosted/edit");

    cy.get('input[name="title"]').focus().clear().type("newTitle");

    cy.get('input[name="prop"]').click();
    cy.contains("li", "House").click();

    cy.get("#bedNumberInput0").click();
    cy.contains("li", "3").click();

    cy.get("#roomTypeInput0").click();
    cy.contains("li", "Private room").click();

    cy.get('input[name="amen"]').click();
    cy.contains("li", "Wifi").click();
    cy.contains("li", "Oven").click();

    cy.get('input[name="youtube"]').focus();

    cy.get('input[name="thumbnail"]').selectFile("src/assets/2.jpg", {
      force: true,
    });
    cy.get('button[name="submit"]').click();
  });

  it("should publish a listing successfully", () => {
    // check button is publishing not unpublishing
    cy.get('button[name="set-publish0"]').should("be.visible");
    cy.get('button[name="set-unpublish0"]').should("not.be.exist");

    cy.get('button[name="set-publish0"]').click();
    cy.get("#startDateInput0").type("2023-12-20");
    cy.get("#endDateInput0").type("2023-12-25");
    cy.get('button[name="submit"]').click();
    // check button is unpublishing not publishing
    cy.get('button[name="set-unpublish0"]').should("be.visible");
    cy.get('button[name="set-publish0"]').should("not.be.exist");
  });

  it("should logout successfully", () => {
    cy.get('button[name="logout-btn"]').click();
    cy.get("#redirect").click();
    // check url
    cy.url().should("include", "localhost:3000/");
    cy.get('button[name="register-btn"]').should("be.visible");
    cy.get('button[name="login-btn"]').should("be.visible");
    cy.get('button[name="logout-btn"]').should("not.be.exist");
  });

  it("should navigate to register screen successfully", () => {
    cy.get('button[name="register-btn"]').click();
    // check url match
    cy.url().should("include", "localhost:3000/register");
  });

  it("should register second user successfully", () => {
    cy.get('input[name="email"]').focus().type("randomEmail2@email.com");

    cy.get('input[name="name"]').focus().type("randomUser2");

    cy.get('input[name="password"]').focus().type("randomPassword123");

    cy.get('input[name="confirm"]').focus().type("randomPassword123");

    cy.get('button[name="submit"]').click();

    cy.url().should("include", "localhost:3000/");
    cy.get('button[name="register-btn"]').should("not.be.exist");
    cy.get('button[name="login-btn"]').should("not.be.exist");
    // check logout button, hosted listings button, all listings button exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
  });

  it("should view listing detail successfully", () => {
    // check there is a published listing
    cy.get("#listing0").should("be.visible");

    cy.get("#listing0").click();
    // check url
    cy.url().should("include", "localhost:3000/listing");
  });

  it("should make a booking successfully", () => {
    cy.get('#leave-review').should("not.be.exist");
    cy.get('#booking-summary').should("not.be.exist");
    cy.get('button[name="booking"]').click();

    cy.get("#startDateInput0").type("2023-12-20");
    cy.get("#endDateInput0").type("2023-12-23");
    cy.get('button[name="submit"]').click();

    cy.get('button[name="confirm"]').click();

    cy.get('#leave-review').should("be.visible");
    cy.get('#booking-summary').should("be.visible");
  });

  it("should logout successfully", () => {
    cy.get('button[name="logout-btn"]').click();
    // check url
    cy.url().should("include", "localhost:3000/listing");
    // check buttons
    cy.get('button[name="register-btn"]').should("be.visible");
    cy.get('button[name="login-btn"]').should("be.visible");
    cy.get('button[name="logout-btn"]').should("not.be.exist");
  });

  it("should navigate to login screen successfully", () => {
    cy.get('button[name="login-btn"]').click();
    // check url
    cy.url().should("include", "localhost:3000/login");
  });

  it("should login first user successfully", () => {
    cy.get('input[name="email"]').focus().type("randomEmail@email.com");

    cy.get('input[name="password"]').focus().type("randomPassword123");

    cy.get('button[name="login"]').click();
    // check url
    cy.url().should("include", "localhost:3000/");
     
    // check buttons
    cy.get('button[name="register-btn"]').should("not.be.exist");
    cy.get('button[name="login-btn"]').should("not.be.exist");
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
  });

  it("should navigate to hosted page successfully", () => {
    cy.get('a[name="hosted-link"]').click();
    // check url
    cy.url().should("include", "localhost:3000/hosted");
  });

  it("should unpublish a listing successfully", () => {
    cy.get('button[name="set-publish0"]').should("not.be.exist");
    cy.get('button[name="set-unpublish0"]').should("be.visible");
    cy.get('button[name="set-unpublish0"]').click();
    cy.get('button[name="set-publish0"]').should("be.visible");
    cy.get('button[name="set-unpublish0"]').should("not.be.exist");
  });

  it("should logout successfully", () => {
    cy.get('button[name="logout-btn"]').click();
    cy.get("#redirect").click();
    // check url
    cy.url().should("include", "localhost:3000/");
  });
});
