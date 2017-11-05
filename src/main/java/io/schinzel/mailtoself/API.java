package io.schinzel.mailtoself;

import com.atexpose.Expose;
import com.atexpose.util.mail.GmailEmailSender;
import io.schinzel.basicutils.RandomUtil;
import io.schinzel.basicutils.configvar.ConfigVar;
import io.schinzel.basicutils.crypto.CipherLibrary;
import io.schinzel.basicutils.crypto.cipher.Aes256Gcm;

/**
 * The purpose of this class is to hold the API methods.
 */
public class API {
    private static final int SUBJECT_MAX_LENGTH = 20;
    private CipherLibrary mCipherLibrary;


    API() {
        //Create the crypto used to encrypt the password stored on the client
        String cryptoKeyEmailV1 = ConfigVar.create(".env").getValue("CRYPTO_KEY_EMAIL_V1");
        //Add the email crypto to the cipher library
        mCipherLibrary = CipherLibrary.create().addCipher(1, new Aes256Gcm(cryptoKeyEmailV1));
        //Do a warm up encryption. On a 2017 MaxBook Pro the first encryption took approximately
        //200ms and the the second encryption 0.2ms.
        mCipherLibrary.encrypt(1, RandomUtil.getRandomString(20));
    }


    @Expose(
            requiredArgumentCount = 3,
            requiredAccessLevel = 1,
            arguments = {"Message", "Username", "Password"},
            description = "Sends an email",
            theReturn = "Status of operation message")
    String mailMe(String message, String username, String password) {
        //Set subject to be start of message
        String subject = message.length() > SUBJECT_MAX_LENGTH
                ? message.substring(0, SUBJECT_MAX_LENGTH) + "..."
                : message;
        String clearTextPassword = mCipherLibrary.decrypt(password);
        Runnable r = () -> {
            new GmailEmailSender(username, clearTextPassword).send(username, subject, message, "Me");
        };
        new Thread(r, "email-send-thread").start();
        return "Mail sent: '" + subject + "'";
    }


    @Expose(
            requiredArgumentCount = 1,
            requiredAccessLevel = 1,
            arguments = {"Password"},
            description = "Encrypts the argument password",
            theReturn = "The argument password encrypted")
    String encryptPassword(String password) {
        return mCipherLibrary.encrypt(1, password);
    }
}
