### 2.1. Feature Set 1. Admin Auth

1. The register form additional validation:
    - Username must be 3-20 characters long and can contain only letters, numbers, and underscores
    - Password must be at least 8 characters long and include a letter, a digit, and may contain special characters
    - Using regular expression to check if email address user provides is valid or not

2. A navigation bar is shown on all pages to improve UI/UX, and the nav bar renders according to user's authorization status:
    - for unauthorized user, login and register buttons are provided.
    - for login authorized user, hosted listings page button, all listings page button and logout button are provided.

### 2.2. Feature Set 2. Creating & Editing & Publishing a Hosted Listing

1. A 'Return to main page' button is provided at the middle of the page, which is more convenient for user to interact.

2. Conditionally rendering the reviews & SVG ratings of the listing:
    - if listing has no reviews, a text is displayed indicating that.
    - Otherwise rating & No. of reviews are displayed

3. For listing create
    - a selection list of common property types are provided, guiding user to provide reliable infomation about the listing.
    - for amenities, a predefined list of common options, which guides user to provide accurate information about their listing.
    - a default 'bedroom' input row is provided, which contains number of beds and bedroom type. 
    - User has the option to add more bedrooms using designated button. There are delete buttons which allows user to delete the bedroom they selected before submitting
    - at least one bedrooms input is needed to make the listing valid.

5. For listing publishing, there is one default start and end date input to let user enter, we use default form validation with required attribute to check user has to enter dates before submit

6. Listing create, edit, delete are live responsive, user could see page updating without refreshing the page.

### 2.3. Feature Set 3. Landing Page: Listings and Search

1. Providing a reset button which allows user to reset the filtered listings with any order to default listing and default listing order. This improves user experience so that user could go back to initial state of the listing page without refreshing.

2. Similar to hosted page, conditional rendering Number of total reviews && SVG rating of the listing, if listing has no reviews yet, a text is diplayed indicating no reviews, otherwise rating && number of reviews are shown.

3. For listing, not only Title, Thumbnail of property, Number of total reviews are shown, we also show Property Type, Number of beds (not bedrooms), Number of bathrooms, SVG rating of the listing (based on user ratings), and Price (per night).

### 2.4. Feature Set 4. Viewing and Booking Listings 

1. Use carousel to display listing's images with autoplay, enhance Usability & Accessibility and user experience.

2. Conditional rendering Number of total reviews && SVG rating of the listing, if listing has no reviews yet, there should display a text indicate no reviews, otherwise show reiews using carousel.

3. Only show no more than 3 lines of the comments, but provide a button to let user read full content review in a modal, increase Usability & Accessibility and user experience.

4. Conditional rendering leaving review and bookings summary , if user not loggin, they do not rendered, if user do not have any bookings, they do not rendered.

5. Conditional rendering book listing button, if user do not login, it does not exist.

6. When user book listing, submit button is disabled until user entered the dates, increase Usability & Accessibility and user experience.

7. When user gives review, a dropdown list is given to select a booking they want to review for. The booking that is either pending or denied are disable in the dropdown list, prompting user to only post review for accepted booking.

### 2.5. Feature Set 5. Removing a Listing, Managing Booking Requests

1. Split bookings into two sections: history bookings and pending bookings. User will not know where they are looking for when they use app, increase Usability & Accessibility and user experience.

2. After accept / denied a pending booking, page will automatially update (booking goes to booking summary section) so user will immediately see the bookings has been handled.

### 2.6. Feature Set 6. Advanced Features 

1. On hover of star rating we also show the total number of reviews.

2. On hover of star rating we have a progress bar to indicate the percentage of the specific rating reviews in all reviews.


### Additional feature:

1. On hosted page, hosted-bookings page, after user logout, user will navigate the no permission page, which has a redirect button could redirect them to home page.

2. If user try to access our authorized page by URL without login, no permission page will render and a button is given to redirect to landing page for un-authorized user..