package io.bini.base.user.role;

import io.bini.base.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/role")
public class RoleController extends BaseController<Role, RoleDTO, Long> {

    @Autowired
    public RoleController(RoleService service) {
        super(new String[]{"USER", "ADMIN"}, service);
    }
}
