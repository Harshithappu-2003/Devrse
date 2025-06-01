# DevRse APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profile router

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API

## connectionRequestRouter

- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId //mainly for reciver side

// for reciver side only one api for the both accepted adn rejected so make it dynamic by adding status instead of accepted or rejected
<!-- - POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId -->

## userRouer

- GET /user/requests/received
- GET /user/connections

- feed api is most imp api this api will bring data of other users
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignored, interested, accepted, rejected
