import { Link } from 'react-router-dom'

const QuestionsCTA = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-navy-500 to-primary-500 text-white rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <h2 className="text-lg font-bold shrink-0">
            Still have questions?
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full flex flex-col sm:flex-row gap-2 md:ml-auto md:max-w-xl"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 px-3 py-2 rounded-full text-gray-900 text-sm focus:outline-none"
            />

            <input
              type="tel"
              placeholder="+1 (___) ___-____"
              className="flex-1 px-3 py-2 rounded-full text-gray-900 text-sm focus:outline-none"
            />

            <button
              type="submit"
              className="bg-white text-primary-600 font-bold px-5 py-2 rounded-full text-sm whitespace-nowrap hover:bg-gray-100"
            >
              ASK A QUESTION
            </button>
          </form>
        </div>

        <p className="text-[10px] text-primary-100 mt-2">
          By clicking the button, you agree to the processing of{' '}
          <Link
            to="/privacy"
            className="underline hover:text-white"
          >
            personal data
          </Link>
        </p>
      </div>
    </section>
  )
}

export default QuestionsCTA
