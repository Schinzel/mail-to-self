package io.schinzel.mailtoself;

import com.atexpose.AtExpose;

public class Main {

    public static void main(String[] args) {
        //Render start message
        System.out.println("***************************************");
        System.out.println("****                               ****");
        System.out.println("****       -= Mail To Self =-      ****");
        System.out.println("****                               ****");
        System.out.println("***************************************");

        AtExpose.create()
                .startCLI()
                .getWebServerBuilder()
                .port(5555)
                .startWebServer();
    }
}
