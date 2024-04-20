package kazay.anas.rest.webservices.backend.helloworld;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping(path = "/basicauth")
    public String basicAuthCheck() {
        return "Success";
    }

    @GetMapping(path = "/hello-world")
    public String helloWorld() {
        return "Hello World 2";
    }

    @GetMapping(path = "/hello-world-bean")
    public HelloWorldBean helloWorldBean() {
        return new HelloWorldBean("Hello World SS");
    }

    @GetMapping(path = "/hello-world/path-variable/{name}")
    public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
        return new HelloWorldBean(String.format("Hello World, %s", name));
    }

    @GetMapping("/csrf-token")
    public CsrfToken retrieveCsrfToken(HttpServletRequest resquest){
        return (CsrfToken) resquest.getAttribute("_csrf");
    }

}
