package io.bini.base.user;

import io.bini.base.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApplicationUserDTO implements BaseEntity<Long> {

    Long id;

    String username;

    String email;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
