package io.schinzel.mailtoself;

import com.atexpose.Expose;
import com.atexpose.util.mail.GmailEmailSender;
import com.atexpose.util.mail.IEmailSender;
import io.schinzel.basicutils.configvar.ConfigVar;
import io.schinzel.basicutils.crypto.CipherLibrary;
import io.schinzel.basicutils.crypto.cipher.Aes256Gcm;

/**
 * The purpose of this class is to send mails
 */
public class Sender {
    private static final int SUBJECT_MAX_LENGTH = 20;
    private IEmailSender mEmailSender;
    CipherLibrary mCipherLibrary;


    Sender() {
        String cryptoKeyEmailV1 = ConfigVar.create(".env")
                .getValue("CRYPTO_KEY_EMAIL_V1");
        mCipherLibrary = CipherLibrary.create()
                .addCipher(1, new Aes256Gcm(cryptoKeyEmailV1));
    }


    @Expose(
            requiredArgumentCount = 4,
            requiredAccessLevel = 1,
            arguments = {"Message", "Username", "FromName", "Password"})
    String mailMe(String message, String username, String fromName, String password) {
        String subject = message.length() > SUBJECT_MAX_LENGTH
                ? message.substring(0, SUBJECT_MAX_LENGTH) + "..."
                : message;
        String clearTextPassword = mCipherLibrary.decrypt(password);
        if (mEmailSender == null) {
            mEmailSender = new GmailEmailSender(username, clearTextPassword);
        }
        Runnable r = () -> {
            mEmailSender.send(username, subject, message, fromName);
        };
        new Thread(r, "email-send-thread").start();
        return "Mail sent: '" + message + "'";
    }


    @Expose(
            requiredArgumentCount = 1,
            requiredAccessLevel = 1,
            arguments = {"Password"})
    String encryptPassword(String password) {
        return mCipherLibrary.encrypt(1, password);
    }
}
