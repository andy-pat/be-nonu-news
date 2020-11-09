const { formatTimestamp, formatCommentData, createArticleRef } = require('../db/utils/data-manipulation')


describe('formatTimestamp', () => {
    test('does not mutate the data given', () => {
        const testArticles = [{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }]

        formatTimestamp(testArticles)

        expect(testArticles).toEqual([{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }])


    });
});



describe('formatCommentData()', () => {
    test('does not mutate the data given', () => {

        const testComments = [{
            body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389,
        },
        {
            body:
                'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
            belongs_to: 'Living in the shadow of a great man',
            created_by: 'butter_bridge',
            votes: 14,
            created_at: 1479818163389,
        }];

        formatCommentData(testComments)

        expect(testComments).toEqual([{
            body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389,
        },
        {
            body:
                'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
            belongs_to: 'Living in the shadow of a great man',
            created_by: 'butter_bridge',
            votes: 14,
            created_at: 1479818163389,
        }]);

    });
});

describe('test for createArticleRef', () => {
    test('returns object with article reference', () => {
        const input = [{
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            body: 'some gifs',
            votes: 0,
            topic: 'mitch',
            created_at: '2010-11-17T12:21:54.171Z',
            author: 'icellusedkars'
          },
          {
            article_id: 4,
            title: 'Student SUES Mitch!',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            topic: 'mitch',
            created_at: '2006-11-18T12:21:54.171Z',
            author: 'rogersop'
          }]
        expect(createArticleRef(input)).toEqual({ 'Eight pug gifs that remind me of mitch': 3, 'Student SUES Mitch!': 4 })
    })
})


describe('test for formatCommentData', () => {
    test('returns object with article reference', () => {
        const input1 = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
          },
          {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            belongs_to: 'Making sense of Redux',
            created_by: 'grumpy19',
            votes: 7,
            created_at: 1478813209256,
          }]
          const input2 = { 'The People Tracking Every Touch, Pass And Tackle in the World Cup': 3, 'Making sense of Redux': 4 }
        expect(formatCommentData(input1, input2)).toEqual([{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            article_id: 3,
            author: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
          },
          {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            article_id: 4,
            author: 'grumpy19',
            votes: 7,
            created_at: 1478813209256,
          }])
    })
})