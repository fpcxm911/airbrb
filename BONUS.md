### 2.1. Feature Set 1. Admin Auth

1. additional validation is added to register page:
    - Using regular expression to ensure email address is valid
    - Username must be 3-20 characters long and can contain only letters, numbers, and underscores
    - Password must be at least 8 characters long and include a letter, a digit, and may contain special characters

2. A navigation bar is shown on all pages, and the nav bar renders according to user's authorization status:
    - for unauthorized user, login and register buttons are provided.
    - for login authorized user, hosted listings page button, all listings page button and logout button are provided.

### 2.2. Feature Set 2. Creating & Editing & Publishing a Hosted Listing

1. A 'Return to main page' button is provided at the centre of the page, which is convenient for user to interact.

2. Conditionally rendering the reviews & SVG ratings of the listing:
    - if listing has no reviews, a text is displayed indicating that.
    - Otherwise rating & No. of reviews are displayed

3. For listing create
    - property types: a designated selection list is provided, guiding user to provide reliable infomation about the listing.
    - amenities: a predefined list of common options is provided
    - bedroom property:
        - a default 'bedroom' input row is provided, which contains number of beds and bedroom type input fields. 
        - provide add button to add more bedrooms
        - provide delete buttons which allows user to delete certain bedroom input.
        - form validation ensures at least one bedrooms input is needed to make the listing valid.

5. For listing publish:
    - one row of availability range input field is provided by default
    - validation to prevent availability date ranges overlap
    - validation to ensure at least one availability date range provided

6. Listing create, edit, and delete are live responsive. User could see page updating without refreshing the page.

### 2.3. Feature Set 3. Landing Page: Listings and Search

1. A reset button is provided, which allows user to clear the search result and go back to initial state of the listing page without refreshing

2. Conditionally rendering Number of total reviews & SVG rating
    - if listing has no reviews yet, a text is diplayed indicating no reviews
    - otherwise, ratings & number of reviews are shown.

3. For listing showing, following additional info is shown to provide better UX
    - Property Type
    - Number of beds (not bedrooms)
    - Number of bathrooms
    - SVG rating of the listing (based on user ratings)
    - Price (per night).

### 2.4. Feature Set 4. Viewing and Booking Listings 

1. Use carousel to display listing's images with autoplay, which improves user experience

2. Conditionally rendering Number of total reviews && SVG rating of the listing, 
    - if listing has no reviews yet, a text displayed indicating no reviews
    - otherwise show reiews details using carousel.

3. Only show at most 3 lines of long comments by default, a button is provided to read full review in a modal.

4. Conditionally render 'leave review' and 'bookings summary' sections
    - if user is not logged in, these sections do not rendered
    - if user do not have any bookings with the listing, these sections do not rendered.

5. Conditionally render 'book listing' button, if user do not login, the booking button does not render.

6. when user makes a booking:
    - submit button is disabled until user entered the valid dates, prompting user to provide accurate information
    - input fields validates onChange, ensureing check-in date is in the future, and check-in date precedes check-out date

7. when user posts a review:
    - a dropdown list is provided to select a booking they want to review for.
    - pending and denied booking are disable in the dropdown list, ensuring user only posts review for valid accepted booking.

### 2.5. Feature Set 5. Removing a Listing, Managing Booking Requests

1. Split bookings into two sections: history bookings and pending bookings. This provides a intuitive UI for host to mange booking requests.

2. After accepting / denying a pending booking, page automatially updates (newly managed booking goes to booking summary section), so user could immediately see the bookings has been handled.

### 2.6. Feature Set 6. Advanced Features 

1. On hover of star ratings
    - the total number of reviews is shown
    - a progress bar is shown to indicate the percentage of the specific rating among all reviews.


### Additional feature:

1. If user tries to access the authorized page by URL without login, no permission page will render and a button is given, which navigates un-authorized user to landing page.

2. On hosted page, and manage-bookings page, after user logout, they will be navigated to 'no permission' page, which has a redirect button which redirects them to landing home page.
