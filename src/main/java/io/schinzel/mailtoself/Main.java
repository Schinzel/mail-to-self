package io.schinzel.mailtoself;

import com.atexpose.AtExpose;
import com.atexpose.dispatcher.logging.Logger;
import com.atexpose.dispatcher.logging.LoggerType;
import com.atexpose.dispatcher.logging.format.LogFormatterFactory;
import com.atexpose.dispatcher.logging.writer.LogWriterFactory;
import io.schinzel.basicutils.configvar.ConfigVar;

public class Main {

    public static void main(String[] args) {
        //Render start message
        System.out.println("***************************************");
        System.out.println("****                               ****");
        System.out.println("****       -= Mail To Self =-      ****");
        System.out.println("****                               ****");
        System.out.println("***************************************");
        AtExpose atExpose = AtExpose.create();
        atExpose.getAPI()
                .expose(new Sender());
        atExpose.startCLI()
                .getWebServerBuilder()
                .port(Integer.valueOf(ConfigVar.create(".env").getValue("PORT")))
                .accessLevel(1)
                .cacheFilesInRAM(false)
                .webServerDir("website")
                .startWebServer()
                .addLogger(getEventLogger());
    }


    private static Logger getEventLogger() {
        return Logger.builder()
                .loggerType(LoggerType.EVENT)
                .logFormatter(LogFormatterFactory.JSON.create())
                .logWriter(LogWriterFactory.SYSTEM_OUT.create())
                .build();
    }
}
