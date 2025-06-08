package org.electrospinningdata.repository;

import org.electrospinningdata.model.Morphology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MorphologyRepository extends JpaRepository<Morphology, Long> {
    Morphology findByLabelAndCategory(String label, Morphology.category category);
}
