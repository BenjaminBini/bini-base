package io.bini.base.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.bini.base.persistence.BaseEntity;
import io.bini.base.user.role.RoleDTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
public class ApplicationUserDTO implements BaseEntity<Long> {

    Long id;

    String username;

    String email;

    @JsonIgnore
    String password;

    Collection<RoleDTO> roles;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
