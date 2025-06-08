package org.electrospinningdata.repository;

import org.electrospinningdata.model.PolymerComponents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolymerComponentsRepository extends JpaRepository<PolymerComponents, Long> {
}
