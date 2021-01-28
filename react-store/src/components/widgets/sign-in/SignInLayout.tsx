/**
*==================================================
Copyright [2021] [HCL Technologies]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/

//Standard libraries
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { ForgotPassword } from "../forgot-password";
import { HOME } from "../../../constants/routes";
//Redux
import * as userAction from "../../../redux/actions/user";
import { loginStatusSelector } from "../../../redux/selectors/user";
//UI
import {
  StyledTextField,
  StyledButton,
  StyledTypography,
} from "../../StyledUI";
import GoogleSignIn from "../../social-signon/GoogleSignIn";
import FacebookSignIn from "../../social-signon/FacebookSignIn";
import voiceImageTranscibeService from "../../../_foundation/apis/search/voiceImageTranscibe.service";
import GADataService from "../../../_foundation/apis/gtm/gaData.service";
 /**PUSH Notification */
import notificationService from "../../push-notification/notification.service";
import { askForPermission } from "../../push-notification/push-notification";
 /**PUSH Notification */

interface SignInContext {
  cid: string;
  redirectRoute?: string;
}

function SignInLayout({ cid, ...props }: SignInContext) {
  const redirectRoute = props.redirectRoute ? props.redirectRoute : HOME;
  const loginStatus = useSelector(loginStatusSelector);
  const { mySite } = useSite();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [logonInputProps, setLogonInputProps] = useState<any>({});
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const logonIdLabel = t("SignIn.Label.B2B");
  const emailLabel = t("SignIn.Label.Email");

  const handleSubmit = (props: any) => {
    props.preventDefault();
    dispatch(
      userAction.LOGIN_REQUESTED_ACTION({
        body: {
          logonId: email,
          logonPassword: password,
        },
      })
    );
     /**GA360 */
     GADataService.sendFormCompletionEvent(t("SignIn.SignInButton"));
     /**GA360 */
  };

  useEffect(() => {
    if (mySite) {
      if (mySite.isB2B) {
        setLogonInputProps({
          maxLength: 100,
          type: "text",
        });
      } else {
        setLogonInputProps({
          maxLength: 100,
          type: "email",
          placeholder: "name@domain.com",
        });
      }
    }
  }, [mySite]);

  /**PUSH Notification */
  const showWelcomeNotification = () => {
    askForPermission().then(() => {
      if (sessionStorage.getItem("notification-flag") ) {
        notificationService.sendNotification("Welcome to Emerald", "Happy Shopping !!!");
      }
    })
  }
  /**PUSH Notification */
  
  if (loginStatus === true) {
	   /**PUSH Notification */
    showWelcomeNotification();
	 /**PUSH Notification */
    return <Redirect to={redirectRoute} />;
  } else {
    return (
      <>
        <StyledTypography
          component="h1"
          variant="h4"
          className="bottom-margin-1">
          {t("SignIn.ReturningCustomer")}
        </StyledTypography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label={mySite.isB2B ? logonIdLabel : emailLabel}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            inputProps={logonInputProps}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("SignIn.Password")}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            inputProps={{
              maxLength: 100,
              type: "password",
            }}
          />
          <ForgotPassword />
          <StyledButton type="submit" color="primary">
            {t("SignIn.SignInButton")}
          </StyledButton>
        </form>
        <GoogleSignIn/>
        <FacebookSignIn />
      </>
    );
  }
}

export { SignInLayout };
