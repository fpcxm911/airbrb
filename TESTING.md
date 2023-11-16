## Component Tests
### Listing Card
#### Testing 


## UI Testing Approach
For bookingReview UI testing, we aim to test booking system, and leaving review in our app

***Note: The detail section contains more steps than main steps since there are more page transition and validation details***
### Main Steps
1. Registers admin successfully
2. Admin creates a new listing successfully
3. Admin publish a listing successfully
4. Admin logout successfully
5. Registers customer successfully
6. Customer make booking fror published listing successfully
7. Customer logout successfully
8. Login admin successfully
9. Admin accpet customer's booking
10. Admin logout successfully
11. Login customer successfully
12. Customer leave a review successfully
13. Customer logout successfully

### Detail
1. Navigate to home screen, check URL matches home page, check register, login button exist, check logout button does not exist.

2. Click the register button to navigate the register page, check the url matches register page, check this page contains a title which indicate it is register page.

3. Register admin user account, after click submit check the page go back to home page, check the url match the home page url, check there should no login, register button, logout button, hosted page button, all-listings page button all exist.

4. Admin click the hosted page button to navigate the hosted page, check url matched hosted page, check logout button, hosted page button, all-listings page button all exist on hosted page, there also should be a button which open the create listing modal.

5. Check there is no listings yet in hosted page. Then click the creating listing button to create a new list, after submit check there is a listing and it's detail matches with the detail we entered when creating, check there are four option buttons for listing which are edit, delete, booking-page and publish. 

6. Click Publishing listing with start date: 2023-12-20 end date: 2023-12-25, check the button has been convert to unpublish once submit.

7. Click Logout button, then go to no-permission page, check there is a redirect button, click redirect button go to home page, then check login, register button are exist, logout button does not exist, check there is a published listing on home page.

8. Click the register button to navigate the register page, check the url matches register page, check this page contains a title which indicate it is register page.

9. Register customer user account, after click submit check the page go back to home page, check the url match the home page url, check there should no login, register button, logout button, hosted page button, all-listings page button all exist.

10. Check there is a listing on the home page. click this listing card to listing card detail page. check url matched listing detail page, check logout button, hosted page button, all-listings page button all exist on listing detail page, check there is a booking button to book this listing, check bookings summary and leave review section since there is no booking for user yet.

11. Click the booking button, check before enter the date submit button is disabled, check submit button is enabled after enter start date (2023-12-20) and end dates (2023-12-23), submit and confirm booking, then check there should be a successful booking notification. 

12. Click Logout button, check url still on list detail page, check there is no booking button after logout, also check login and register button exist.

13. Click login button, check url matches login page, check there is a login heading which indicate we are in login screen.

14. Login Using admin account, after login check login and register button are not exist, logout button exist.

15. Click hosted page button to navigate hosted page, check url matches hosted page, check login ,register button not in the page, logout and create list button in the page.

16. Check there is a listing in the page, check there is a booking page button for this listing, click booking page button to navigate booking page, check url matches with booking page, check the booked-days content (0 Days), check no profit so far ($0), check from published days (0 Days), check there are accept and deny button for the booking customer just booked.

17. Click the accecpt button, then check there is no pending bookings anymore, check total earning update to &660

18. Click lougout as admin, check there should be a redirect button, click redirect button to home page, check url matches home page. check login and register button exist, logout button doest ont exist.

19. Click login button to navigate login page, check url matches login page, check there is a heading which indicate page is login page.

20. Login with customer account, after submit check login, register button do not exist, logout button exists.

21. Check there is a published listing on home page. click listing to navigate listing detail page, check url matches with listing detail page, check buttons, check leave-review and booking summary visible since admin has accept customer booking, check there is no reviews for this booking yet.

22. In the review form select the booking customer just made, enter the comment, choose 5 star and submit. check there is a review in review section.

23. Click logout button to logout as customer, check after logout still on list detail page, check after logout leave-review and booking-summary do not exist, check reviews are still exists.
check booking button, logout button do not exist, check login and register button exist.

