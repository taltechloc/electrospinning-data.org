package org.electrospinningdata.repository;

import org.electrospinningdata.model.Polymer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface PolymerRepository extends JpaRepository<Polymer, Long> {
    Optional<Polymer> findByPolymerName(String polymer);


}
