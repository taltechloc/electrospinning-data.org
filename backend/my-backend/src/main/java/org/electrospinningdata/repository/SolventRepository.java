package org.electrospinningdata.repository;

import org.electrospinningdata.model.Solvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SolventRepository extends JpaRepository<Solvent, Long> {
    Optional<Solvent> findBySolventName(String solventName);

}
