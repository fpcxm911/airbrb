2.1. Feature Set 1. Admin Auth

1. We provide form validation in register page to prevent user register our account with some invalid and unsafe info.
(Usernames must be 3-20 characters long and can contain only letters, numbers, and underscores)
(Passwords must be at least 8 characters long and include a letter, a digit, and may contain special characters)
(also using regular expression check if email address user provide is valid email or not)

2. We provide a nav bark with login and register button if user has not logged in, once user logged in , login and register button will not exist, but instead the hosted listings page button, all listings page button and logout button exist, this increase Usability & Accessibility and user experience so that user will not confused about their login status.

2.2. Feature Set 2. Creating & Editing & Publishing a Hosted Listing

1. We provide Return to main page button which navigate to home page, it has same effect with all listings page button in navbar, but since it in the middle of the page, which could be more convenient.

2. Conditional rendering Number of total reviews && SVG rating of the listing, if listing has no reviews yet, there should display a text indicate no reviews, otherwise show rating && number of reviews.

3. For listing create, we provide a list of common property type to users select, which makes user provide more realistic and reliable infomation about their listing, similarly for amenities, we provide a list of common amenitities so that user will not provide some wired options in their amenitities.

4. For listing create, there is one default bedrooms section which contains number of beds and bedroom type, there is a button which let user add more bedrooms if they want, they are also delete button which let user delete the bedroom they want to delete before submit, but there should be at least one bedrooms info given.

5. For listing publishing, there is one default start and end date input to let user enter, we use default form validation with required attribute to check user has to enter dates before submit

6. Listing create, edit, delete are live responsive, user couold observe page change without refreshing the page.

2.3. Feature Set 3. Landing Page: Listings and Search

1. Providing a reset button which let user reset their filtered listings with any order to default listing and default listing order. This increase Usability & Accessibility and user experience so that user could go back where they start without refresh the page if they did not search listings they want.

2. Similar to hosted page, conditional rendering Number of total reviews && SVG rating of the listing, if listing has no reviews yet, there should display a text indicate no reviews, otherwise show rating && number of reviews.

3. For listing, we not only provide Title, Thumbnail of property , Number of total reviews, we also provide Property Type, Number of beds (not bedrooms), Number of bathrooms, SVG rating of the listing (based on user ratings), Price (per night).

2.4. Feature Set 4. Viewing and Booking Listings 

1. Use carousel to display listing's images with autoplay, increase Usability & Accessibility and user experience.

2. Conditional rendering Number of total reviews && SVG rating of the listing, if listing has no reviews yet, there should display a text indicate no reviews, otherwise show reiews using carousel.

3. Only show no more than 3 lines of the comments, but provide a button to let user read full content review in a modal, increase Usability & Accessibility and user experience.

4. Conditional rendering leaving review and bookings summary , if user not loggin, they do not rendered, if user do not have any bookings, they do not rendered.

5. Conditional rendering book listing button, if user do not login, it does not exist.

6. When user book listing, submit button is disabled until user entered the dates, increase Usability & Accessibility and user experience.

7. When user leave review, give them a dropdown to select the bookings they want to review for, also disabled options if booking status is not accepted.

2.5. Feature Set 5. Removing a Listing, Managing Booking Requests

1. Split bookings to history bookings and pending bookings, user will not know where they are looking for when they use app, increase Usability & Accessibility and user experience.

2. After accept / denied a pending booking, page will automatially update (booking goes to booking summary section) so user will immediately see the bookings has been handled.

2.6. Feature Set 6. Advanced Features 

1. On hover of star rating we also show the total number of reviews.

2. On hover of star rating we have a progress bar to indicate the percentage of the specific rating reviews in all reviews.


Addition:

1. On hosted page, hosted-bookings page, after user logout, they will navigate the no permission page, which has a redirect button could redirect them to home page.

2. If user try to access our authorized page by url without login, no permission page will render.