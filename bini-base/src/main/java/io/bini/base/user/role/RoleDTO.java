package io.bini.base.user.role;

import io.bini.base.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDTO implements BaseEntity<Long> {
    private Long id;
    private String code;
    private String label;
}
