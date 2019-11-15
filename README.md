### Setting Up Development Environment:

- clone the repo and `npm install` the dependencies
- In the `src/config/` directory rename all the `.example.js` to remove the `.example`.
- In the `src/data/` directory rename all the `.example.js` to remove the `.example`.
- Fill in your actual keys and dummy data
- `npm run start` will run in a dev environment
- Create a Firestore db and set it's rules to:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
    	allow create
      allow read: if request.auth.uid != null
      allow write: if request.auth.uid == userId
    }
    match /notifications/{notifications} {
      allow read: if request.auth.uid != null
    }
  }
}
```
