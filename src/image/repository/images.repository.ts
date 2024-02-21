import { EntityRepository, Repository } from 'typeorm';
import { Image } from '../entity/images.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
    
}
