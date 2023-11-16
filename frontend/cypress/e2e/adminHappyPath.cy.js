describe("admin happy path", () => {
  it("should navigate to home screen successfully", () => {
    // navigate to home page
    cy.visit("localhost:3000/");
    // check url match home page
    cy.url().should("include", "localhost:3000/");
    // check login and signup button exist, and logout button does not exist
    cy.get('button[name="register-btn"]').should("be.visible");
    cy.get('button[name="register-btn"]').then(button => expect(button.text()).to.equal('Register'))
    cy.get('button[name="login-btn"]').should("be.visible");
    cy.get('button[name="login-btn"]').then(button => expect(button.text()).to.equal('Login'))
    cy.get('button[name="logout-btn"]').should("not.be.exist");
  });

  it("should navigate to register screen successfully", () => {
    // click register button
    cy.get('button[name="register-btn"]').click();
    // check url match register page, also page should contains a h1 with text "Sign up"
    cy.url().should("include", "localhost:3000/register");
    cy.get('h1').then(h1 => expect(h1.text()).to.equal('Sign up'))
  });

  it("should register admin successfully", () => {
    // type sign up details for user1
    cy.get('input[name="email"]').focus().type("randomEmail@email.com");
    cy.get('input[name="name"]').focus().type("randomUser");
    cy.get('input[name="password"]').focus().type("randomPassword123");
    cy.get('input[name="confirm"]').focus().type("randomPassword123");
    cy.get('button[name="submit"]').click();
    // check go back to home page after register
    cy.url().should("include", "localhost:3000/");
    // check login and register button does not exist
    cy.get('button[name="register-btn"]').should("not.be.exist");
    cy.get('button[name="login-btn"]').should("not.be.exist");
    // check logout button, hosted listings button, all listings button exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('button[name="logout-btn"]').then(button => expect(button.text()).to.equal('Logout'))
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="hosted-link"]').then(link => expect(link.text()).to.equal('Hosted listings'))
    cy.get('a[name="all-listings-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').then(link => expect(link.text()).to.equal('All listings'))
  });

  it("should navigate to hosted page successfully - admin", () => {
    // click hosted page for creating new listing
    cy.get('a[name="hosted-link"]').click();
    // check url match with hosted page
    cy.url().should("include", "localhost:3000/hosted");
    // check logout button, hosted listings button, all listings button still exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
    // check there is a listing create button
    cy.get('button[name="create-list"]').should("be.visible");
    cy.get('button[name="create-list"]').then(button => expect(button.text()).to.equal('Create new listing'))
  });

  it("should create a listing successfully - admin", () => {
    // check there is no listing before creation
    cy.get("#hosted0").should("not.be.exist");
    // click the listing create button
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

    // check listing basic detail matched with one enter in creation form
    cy.get('#title0').then(title => expect(title.text()).to.equal('randomTitle'))
    cy.get('#prop-type0').then(propType => expect(propType.text()).to.equal('Property type : House'))
    cy.get('#num-bath0').then(numBath => expect(numBath.text()).to.equal('Number of bathrooms : 3'))
    cy.get('#num-beds0').then(numBeds => expect(numBeds.text()).to.equal('Number of beds : 3'))
    cy.get('#price0').then(price => expect(price.text()).to.equal('Price : 220 AUD / NIGHT'))

    // check there are edit, booking, delete, publish buttons, but no unpublish button
    cy.get('button[name="edit-list0"]').should("be.visible");
    cy.get('button[name="edit-list0"]').then(button => expect(button.text()).to.equal('EDIT'))
    cy.get('button[name="delete-list0"]').should("be.visible");
    cy.get('button[name="delete-list0"]').then(button => expect(button.text()).to.equal('DELETE'))
    cy.get('button[name="booking-list0"]').should("be.visible");
    cy.get('button[name="booking-list0"]').then(button => expect(button.text()).to.equal('BOOKINGS'))
    cy.get('button[name="set-publish0"]').should("be.visible");
    cy.get('button[name="set-publish0"]').then(button => expect(button.text()).to.equal('PUBLISH'))
    cy.get('button[name="set-unpublish0"]').should("not.be.exist");
    
  });

  it("should edit a listing successfully - admin", () => {
    cy.get('button[name="edit-list0"]').click();
    // check url match with edit listing page
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

    // wait 1 second for fetching finished
    cy.wait(1000)
    // check listing basic detail, title has updated
    cy.get('#title0').then(title => expect(title.text()).to.equal('newTitle'))
    cy.get('#prop-type0').then(propType => expect(propType.text()).to.equal('Property type : House'))
    cy.get('#num-bath0').then(numBath => expect(numBath.text()).to.equal('Number of bathrooms : 3'))
    cy.get('#num-beds0').then(numBeds => expect(numBeds.text()).to.equal('Number of beds : 3'))
    cy.get('#price0').then(price => expect(price.text()).to.equal('Price : 220 AUD / NIGHT'))
  });

  it("should publish a listing successfully - admin", () => {

    cy.get('button[name="set-publish0"]').click();
    cy.get("#startDateInput0").type("2023-12-20");
    cy.get("#endDateInput0").type("2023-12-25");
    cy.get('button[name="submit"]').click();
    // check button is unpublishing not publishing
    cy.get('button[name="set-unpublish0"]').should("be.visible");
    cy.get('button[name="set-unpublish0"]').then(button => expect(button.text()).to.equal('UNPUBLISH'))
    cy.get('button[name="set-publish0"]').should("not.be.exist");
  });

  it("should logout successfully - admin", () => {
    cy.get('button[name="logout-btn"]').click();
    // check has been logout, there should be a button to redirect to home page
    cy.get("#redirect").should("be.visible");
    cy.get("#redirect").then(button => expect(button.text()).to.equal('Go to Home'))
    // click redirect button and check url match home page
    cy.get("#redirect").click();
    cy.url().should("include", "localhost:3000/");
    // check login and signup button exist, and logout button does not exist
    cy.get('button[name="register-btn"]').should("be.visible");
    cy.get('button[name="login-btn"]').should("be.visible");
    cy.get('button[name="logout-btn"]').should("not.be.exist");
    // check there is a published listing
    cy.get("#listing0").should("be.visible");
  });

  it("should navigate to register screen successfully", () => {
    // click register button
    cy.get('button[name="register-btn"]').click();
    // check url match register page, also page should contains a h1 with text "Sign up"
    cy.url().should("include", "localhost:3000/register");
    cy.get('h1').then(h1 => expect(h1.text()).to.equal('Sign up'))
  });

  it("should register customer user successfully", () => {
    cy.get('input[name="email"]').focus().type("randomEmail2@email.com");

    cy.get('input[name="name"]').focus().type("randomUser2");

    cy.get('input[name="password"]').focus().type("randomPassword123");

    cy.get('input[name="confirm"]').focus().type("randomPassword123");

    cy.get('button[name="submit"]').click();

    // check go back to home page after register
    cy.url().should("include", "localhost:3000/");
    // check login and register button does not exist
    cy.get('button[name="register-btn"]').should("not.be.exist");
    cy.get('button[name="login-btn"]').should("not.be.exist");
    // check logout button, hosted listings button, all listings button exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
  });

  it("should view listing detail successfully - customer", () => {
    // check there is a published listing
    cy.get("#listing0").should("be.visible");

    cy.get("#listing0").click();
    // check url match with listing detail page
    cy.url().should("include", "localhost:3000/listing");
    // check logout button, hosted listings button, all listings button still exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
    // check no leave review and booking summary yet
    cy.get('#leave-review').should("not.be.exist");
    cy.get('#booking-summary').should("not.be.exist");
    // check there should be a booking button for current user
    cy.get('button[name="booking"]').should("be.visible");
    cy.get('button[name="booking"]').then(button => expect(button.text()).to.equal('Book this accomodation'))
  });

  it("should make a booking successfully - customer", () => {
    // make a booking
    cy.get('button[name="booking"]').click();
    // check submit button is disable before enter dates
    cy.get('button[name="submit"]').should('be.disabled');
    // enter dates
    cy.get("#startDateInput0").type("2023-12-20");
    cy.get("#endDateInput0").type("2023-12-23");
    // check submit button is enable after enter dates
    cy.get('button[name="submit"]').should('not.be.disabled');
    cy.get('button[name="submit"]').click();
    cy.get('button[name="confirm"]').click();
    // after booking successfully, leave review and booking summary should be visible
    cy.get('#leave-review').should("be.visible");
    cy.get('#booking-summary').should("be.visible");
    // check there is a successful booking notification
    cy.contains('div', 'Your booking made at newTitle is successful.').should('exist');
  });

  it("should logout successfully - customer", () => {
    cy.get('button[name="logout-btn"]').click();
    // check url still match listing detail page
    cy.url().should("include", "localhost:3000/listing");
    // check booking summary and leave review not exist after logout
    cy.get('#leave-review').should("not.be.exist");
    cy.get('#booking-summary').should("not.be.exist");
    // check no booking button after logout
    cy.get('button[name="booking"]').should("not.be.exist");
    // check register buttons, login button visible, logout button disappear
    cy.get('button[name="register-btn"]').should("be.visible");
    cy.get('button[name="login-btn"]').should("be.visible");
    cy.get('button[name="logout-btn"]').should("not.be.exist");
  });

  it("should navigate to login screen successfully", () => {
    cy.get('button[name="login-btn"]').click();
    // check url match with login page
    cy.url().should("include", "localhost:3000/login");
    cy.get('h1').then(h1 => expect(h1.text()).to.equal('Welcome Back'))
  });

  it("should login admin successfully", () => {
    // login with first user again
    cy.get('input[name="email"]').focus().type("randomEmail@email.com");
    cy.get('input[name="password"]').focus().type("randomPassword123");
    cy.get('button[name="login"]').click();
    // check url match with home page
    cy.url().should("include", "localhost:3000/");
    // check buttons
    cy.get('button[name="register-btn"]').should("not.be.exist");
    cy.get('button[name="login-btn"]').should("not.be.exist");
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
  });

  it("should navigate to hosted page successfully - admin", () => {
    cy.get('a[name="hosted-link"]').click();
    // check url match with hosted page
    cy.url().should("include", "localhost:3000/hosted");
    // check logout button, hosted listings button, all listings button still exist
    cy.get('button[name="logout-btn"]').should("be.visible");
    cy.get('a[name="hosted-link"]').should("be.visible");
    cy.get('a[name="all-listings-link"]').should("be.visible");
    // check there is a listing create button
    cy.get('button[name="create-list"]').should("be.visible");
    cy.get('button[name="create-list"]').then(button => expect(button.text()).to.equal('Create new listing'))
  });

  it("should unpublish a listing successfully - admin", () => {
    // check there should be one hosted listing
    cy.get("#hosted0").should("be.visible");
    // check the listing should has been published
    cy.get('button[name="set-publish0"]').should("not.be.exist");
    cy.get('button[name="set-unpublish0"]').should("be.visible");
    cy.get('button[name="set-unpublish0"]').click();
    // check the button status after unpublish it
    cy.get('button[name="set-publish0"]').should("be.visible");
    cy.get('button[name="set-unpublish0"]').should("not.be.exist");
  });

  it("should logout successfully - admin", () => {
    cy.get('button[name="logout-btn"]').click();
    cy.get("#redirect").should("be.visible");
    cy.get("#redirect").click();
    // check url go back to home page
    cy.url().should("include", "localhost:3000/");
    // check there is no published listing
    cy.get("#listing0").should("not.be.exist");
  });
});
