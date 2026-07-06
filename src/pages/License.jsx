import { Link } from 'react-router-dom'
import licenceImg from '../assets/images/license/licence.png'

const License = () => (
  <div className="container mx-auto px-4 py-6">
    <p className="text-xs text-gray-500 mb-2">
      <Link to="/" className="hover:text-primary-500">Главная</Link> / Наша лицензия
    </p>
    <h1 className="text-2xl font-bold mb-4">Наша лицензия</h1>

    <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-6">
      Сеть социальных аптек «Аптека.онлайн» является частью аптечного холдинга. Первая аптека в Москве была
      открыта в 2000 году. Сотрудничая напрямую с производителями и дистрибьюторами, мы не только предоставляем
      лекарства по низким ценам, а также гарантируем подлинность товаров. В наших аптеках допускается продажа
      только разрешенных Минздравом России медикаментов.
    </div>

    <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <img
        src={licenceImg}
        alt="Лицензия на осуществление фармацевтической деятельности"
        className="w-full h-auto rounded-xl"
      />
    </div>

    <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 text-sm text-gray-600">
      Копии сертификатов и лицензий предоставляются по предварительному запросу. Для получения подробной
      информации, пожалуйста, свяжитесь с нами по телефону <span className="font-bold text-primary-600">8-800-777-22-33</span>.
    </div>
  </div>
)

export default License
