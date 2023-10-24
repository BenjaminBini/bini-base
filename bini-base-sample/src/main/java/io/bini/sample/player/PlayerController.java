package io.bini.sample.player;

import io.bini.base.exception.ExistingRelationshipException;
import io.bini.base.web.controller.APIResponse;
import io.bini.base.web.controller.APISuccess;
import io.bini.base.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/player")
public class PlayerController extends BaseController<Player, PlayerDTO, Long> {

    @Autowired
    public PlayerController(PlayerService service) {
        super(service);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse list(@RequestParam Map<String, String> searchParams) {
        return super.list(searchParams);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse save(@RequestBody PlayerDTO dto) {
        return new APISuccess(service.save(dto));
    }

    @Override
    @DeleteMapping("/{id}")
    protected ResponseEntity<PlayerDTO> delete(@PathVariable("id") Long id) throws ExistingRelationshipException {
        return super.delete(id);
    }
}
