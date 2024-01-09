import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../entities/answer';

const fakeAnswersRepository: AnswersRepository = {
  create:  async function (answer: Answer): Promise<void> {
    return;
  }
}


test('create an answer ', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer.'
  })

  expect(answer.content).toEqual('New answer.')
});