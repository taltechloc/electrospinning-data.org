package org.electrospinningdata.repository;

import org.electrospinningdata.model.FiberMorphology;
import org.electrospinningdata.model.FiberProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FiberMorphologyRepository extends JpaRepository<FiberMorphology, Long> {
    List<FiberMorphology> findByFiberProperty(FiberProperties fiberProperties);
}
