package io.bini.base.user;

import io.bini.base.exception.ExistingRelationshipException;
import io.bini.base.web.controller.APIError;
import io.bini.base.web.controller.APIResponse;
import io.bini.base.web.controller.APISuccess;
import io.bini.base.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class ApplicationUserController extends BaseController<ApplicationUser, ApplicationUserDTO, Long> {

    private final ApplicationUserService applicationUserService;

    @Autowired
    public ApplicationUserController(ApplicationUserService service) {
        super(service);
        this.applicationUserService = service;
    }

    @GetMapping("/current")
    protected APIResponse currentUser(Authentication authentication) {
        Optional<ApplicationUser> maybeLoggedInUser = this.applicationUserService.findByUsername(authentication.getName());

        Optional<ApplicationUserDTO> maybeLoggedInUserDTO = maybeLoggedInUser.map(applicationUserService.getMapper()::toDto);

        if (maybeLoggedInUserDTO.isPresent()) {
            return new APISuccess(maybeLoggedInUserDTO.get());
        } else {
            return APIError.notFound();
        }
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse list(@RequestParam Map<String, String> searchParams, @RequestParam(required = false, defaultValue = "0") int page, @RequestParam(required = false, defaultValue = "2000") int delta) {
        return super.list(searchParams, page, delta);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse get(@PathVariable("id") Long id) {
        return super.get(id);
    }

    @Override
    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse update(@RequestBody ApplicationUserDTO dto) {
        return super.update(dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    protected ResponseEntity<ApplicationUserDTO> delete(@PathVariable("id") Long id) throws ExistingRelationshipException {
        return super.delete(id);
    }

    @Override
    @PostMapping("/delete")
    @PreAuthorize("hasAuthority('ADMIN')")
    protected ResponseEntity<ApplicationUserDTO> delete(@RequestBody Iterable<Long> ids) throws ExistingRelationshipException {
        return super.delete(ids);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse save(@RequestBody ApplicationUserWithPasswordDTO dto) {
        return new APISuccess(applicationUserService.save(dto));
    }
}
