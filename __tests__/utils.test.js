const { formatTimestamp, authorKeyUpdate } = require('../db/utils/data-manipulation')


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



describe('authorKeyUpdate()', () => {
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

        authorKeyUpdate(testComments)

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