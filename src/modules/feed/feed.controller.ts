import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { GetFeedDto } from './dto/getFeed.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../user/user.guard';

@UseGuards(UserGuard)
@ApiBearerAuth()
@ApiTags('feeds')
@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getManyFeed(@Query() query: GetFeedDto) {
    return await this.feedService.fetchManyFeed(query);
  }

  @Get(':id')
  async GetFeedDto(@Param('id', ParseIntPipe) id: number) {
    await this.feedService.updateFeedViewCount({ id });
    return await this.feedService.getFeed({ id });
  }

  @Patch(':id/likeCount')
  async patchFeedLikeCount(@Param('id', ParseIntPipe) id: number) {
    return await this.feedService.updateFeedLikeCount({ id });
  }

  @Patch(':id/shareCount')
  async patchFeedShareCount(@Param('id', ParseIntPipe) id: number) {
    return await this.feedService.updateFeedShareCount({ id });
  }
}
