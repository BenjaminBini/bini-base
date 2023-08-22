package io.bini.base.user.role;

import io.bini.base.exception.ExistingRelationshipException;
import io.bini.base.web.controller.APIResponse;
import io.bini.base.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/role")
public class RoleController extends BaseController<Role, RoleDTO, Long> {

    @Autowired
    public RoleController(RoleService service) {
        super(service);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse list(@RequestParam Map<String, String> searchParams) {
        return super.list(searchParams);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse get(@PathVariable("id") Long id) {
        return super.get(id);
    }

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse save(@RequestBody RoleDTO dto) {
        return super.save(dto);
    }

    @Override
    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse update(@RequestBody RoleDTO dto) {
        return super.update(dto);
    }

    @Override
    @DeleteMapping("/{id}")
    protected ResponseEntity<RoleDTO> delete(@PathVariable("id") Long id) throws ExistingRelationshipException {
        return super.delete(id);
    }

    @Override
    @PostMapping("/delete")
    @PreAuthorize("hasAuthority('ADMIN')")
    protected ResponseEntity<RoleDTO> delete(@RequestBody Iterable<Long> ids) throws ExistingRelationshipException {
        return super.delete(ids);
    }
}
