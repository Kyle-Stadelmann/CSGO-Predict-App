import { User, updateUser } from 'csgo-prediction-lib';
import GoogleLogin from 'react-google-login';

type GoogleSignInProps = {
    text?: string
    id: string
}

// this function runs after signin and response is the user data
/*  from google: Important: Do not use the Google IDs returned by getId()
    or the user's profile information to communicate the currently signed
    in user to your backend server. Instead, send ID tokens, which can be
    securely validated on the server.
under "Get profile information" here https://developers.google.com/identity/sign-in/web/sign-in */
const responseGoogle = (response: any) => {
    console.log(response);
}

const GoogleSignIn = ({ text, id }: GoogleSignInProps) => {
    
    return (
        <div>
            <GoogleLogin
                clientId={id}
                buttonText={text}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

GoogleSignIn.defaultProps = {
    text: "Log in with Google"
}

export default GoogleSignIn