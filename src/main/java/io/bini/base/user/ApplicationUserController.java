package io.bini.base.user;

import io.bini.base.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class ApplicationUserController extends BaseController<ApplicationUser, ApplicationUserDTO, Long> {

    @Autowired
    public ApplicationUserController(ApplicationUserService service) {
        super(service);
    }
}
