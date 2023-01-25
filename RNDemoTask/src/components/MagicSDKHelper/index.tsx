import { magic } from "../../navigation";
import { updateApiLoader } from "../../redux/reducerSlices/preLogin";
import store from "../../redux/store";

export const emailLogin = async (email) => {
  return new Promise(function (resolve, reject) {
    try {
      const req = magic.auth.loginWithMagicLink({
        email,
      });
      req
        .on("email-sent", () => {
          /* ... */
          console.log("email-sent");
        })
        .on("done", () => {
          /* ... */
          console.log("done");
          store.dispatch(
            updateApiLoader({
              apiLoader: true,
            })
          );
        })
        .then((DIDToken) => {
          /* ... */
          // store.dispatch(updateApiLoader({apiLoader: true}));
          store.dispatch(
            updateApiLoader({
              apiLoader: true,
            })
          );
          magic.user.getMetadata().then(async (value) => {
            console.log("value.email", value.email);
            resolve(value);
            console.log(value, "value");
          });
        })
        .once("email-not-deliverable", () => {
          /* ... */
          console.log("email-not-deliverable");
          reject("Email not deliverable.");
        })
        .catch((error) => {
          /* ... */
          reject(JSON.stringify(error));
        })
        .on("error", (error) => {
          /* ... */
          reject(JSON.stringify(error));
        });
    } catch (err) {
      reject(JSON.stringify(err));
    }
  });
};
