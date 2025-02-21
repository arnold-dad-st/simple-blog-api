import { Controller, Get, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  getQuizQuestions(
    @Query('limit') limit?: number, // Optional query param
  ) {
    // Set default values if params are not provided
    const pageSize = Math.min(Math.max(1, limit ?? 10), 30);

    return this.quizService.getQuestions(pageSize);
  }
}
