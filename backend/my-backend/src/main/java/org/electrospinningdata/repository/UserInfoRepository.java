package org.electrospinningdata.repository;

import org.electrospinningdata.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
    Optional<UserInfo> findByEmail(String email);

    Optional<UserInfo> findByUserId(String userId);

}
