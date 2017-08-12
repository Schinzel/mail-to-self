package io.schinzel.mailtoself;

import com.atexpose.Expose;

/**
 * The purpose of this class is to send mails
 */
public class Sender {

    @Expose(
            requiredArgumentCount = 1,
            requiredAccessLevel = 1,
            arguments = {"Message"})
    static String sendMail(String message) {
        return "Mail sent";
    }
}
