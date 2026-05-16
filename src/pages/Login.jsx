// src/pages/Login.jsx

export default function Login() {
  return (
    <div className="w-screen h-screen bg-[#F8F6F1] flex justify-center items-center overflow-hidden">
      
      <div className="w-[393px] h-[852px] bg-[#F8F6F1] flex flex-col items-center">

        {/* 제목 */}
        <h1 className="text-[28px] font-bold text-[#4B3B2A] mt-[90px]">
          로그인
        </h1>

        {/* 캐릭터 */}
        <img
          src="/bean.png"
          alt="하루콩"
          className="w-[130px] mt-[45px]"
        />

        {/* 앱 이름 */}
        <h2 className="text-[48px] font-bold text-[#4B3B2A] mt-[18px]">
          하루콩
        </h2>

        {/* 이메일 */}
        <div className="w-full px-[55px] mt-[65px]">
          <p className="text-[16px] font-semibold text-[#4B3B2A] mb-[10px]">
            이메일
          </p>

          <input
            type="text"
            placeholder="이메일을 입력하세요"
            className="w-full h-[58px] rounded-[18px] bg-[#F5F1EA] px-[20px] outline-none text-[15px] placeholder:text-[#B5AA9B] shadow-sm"
          />
        </div>

        {/* 비밀번호 */}
        <div className="w-full px-[55px] mt-[24px]">
          <p className="text-[16px] font-semibold text-[#4B3B2A] mb-[10px]">
            비밀번호
          </p>

          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full h-[58px] rounded-[18px] bg-[#F5F1EA] px-[20px] outline-none text-[15px] placeholder:text-[#B5AA9B] shadow-sm"
          />
        </div>

        {/* 버튼 */}
        <button className="w-[283px] h-[58px] bg-[#A7C957] rounded-[18px] text-white text-[17px] font-semibold mt-[42px] hover:brightness-95 transition">
          로그인
        </button>

        {/* 회원가입 */}
        <p className="text-[#9B9387] text-[15px] mt-[28px]">
          계정이 없으신가요?{" "}
          <span className="font-bold text-[#4B3B2A] cursor-pointer">
            회원가입
          </span>
        </p>

      </div>
    </div>
  );
}