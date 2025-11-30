**City Pulse – Local Events Explorer**

City Pulse is a React Native mobile application that helps users discover local events, explore details, save favorites, view event locations on a map, and switch between English and Arabic with RTL support.
The app also includes Firebase authentication and biometric login for a smooth and secure experience.


📱 **Features**

_1. Authentication (Firebase + Biometric)_

    Email and password signup/login using Firebase Auth.
    Biometric authentication (Fingerprint or Face ID) on Login screen.
    Secure session handling with AuthContext.

_2. Home Screen – Events Search_

    Search local events through the Ticketmaster API.
    Displays a list of matching events with quick event info.
    Clean UI with fast, async API calls.

_3. Event Details Screen_

    Shows complete event information.
    Map preview using react-native-maps with event coordinates.
    Add to Favorites button.

_4. Favorites (Local Storage)_

    Stored using AsyncStorage.
    Prevents duplicates.
    Accessible from Profile Screen.
    Remove favorites anytime.

_5. Profile Screen_

    Displays logged-in user details.
    Shows saved favorites list.
    Remove favorite items.
    Logout functionality.
    Language toggle (English / Arabic).

_6. Language Support_

    English and Arabic switch.
    Includes full RTL layout for Arabic mode.

🛠️ **Tech Stack**

    - React Native
    - React Navigation
    - Firebase Authentication
    - AsyncStorage
    - Ticketmaster Events API
    - react-native-vector-icons
    - react-native-maps

📁 **Project Structure**

<img width="432" height="878" alt="image" src="https://github.com/user-attachments/assets/9c60bbe7-0a18-4e9e-bbb7-287cdee0d382" />

🔐 **Auth Flow**

    User logs in using Firebase email/password.
    Biometric popup appears (if device supports it).
    On success → Redirects to Home Screen.
    User can logout from Profile.

⭐ **Favorites Storage (AsyncStorage)**

    Stored with key:
        FAVOURITE_EVENTS
        
    Operations:
        saveFavourite(event)
        getFavourites()
        removeFavourite(id)

    Favorites persist even after app restart.

🌍 **Event Location (Map)**

    Event Details screen displays map preview.
    Uses latitude/longitude from Ticketmaster event data.
    
🚀 **Installation & Setup**

      1. Clone Repository
          git clone https://github.com/<username>/<repo>.git
          cd project-folder
          
      2. Install Dependencies
          npm install
          
      3. Firebase Setup
          Add google-services.json to android/app/.
          Enable Email/Password authentication in Firebase console.
          
      4. Start Metro Bundler
          npm start
          
      5. Run App on Android
          npm run android

🧪 **Test Checklist**

      Login & Signup flows.
      Biometric authentication.
      Event search and list rendering.
      Event details with map view.
      Add/Remove favorites.
      Language toggle (English ↔ Arabic).
      Logout.

👤 **Author**

_Nirmala Bojanapu_

_React Native Developer | Full-Stack Engineer_
