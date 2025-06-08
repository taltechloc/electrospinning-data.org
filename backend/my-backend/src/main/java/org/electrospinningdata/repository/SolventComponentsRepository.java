package org.electrospinningdata.repository;

import org.electrospinningdata.model.SolventComponents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolventComponentsRepository extends JpaRepository<SolventComponents, Long> {
}
