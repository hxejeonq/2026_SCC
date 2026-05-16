import React, { useState, useRef } from 'react';
import beanImg from './assets/bean.png';

export default function App() {
  // 첫 시작 화면을 'login'으로 설정
  const [screen, setScreen] = useState('login');

  // 사용자가 달력에서 클릭한 날짜 상태 관리
  const [selectedDateStr, setSelectedDateStr] = useState('2026.05.04 (수)');

  // [일정 만들기] 화면의 버튼 선택 상태 관리
  const [selectedButtons, setSelectedButtons] = useState({
    who: null, count: null, what: null, time: null
  });

  // 마이페이지 프로필 수정용 상태 시스템
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nickname: '콩콩이',
    age: '24세',
    job: '대학생',
    allergy: '견과류',
    favFood: '한식',
    favActivity: '산책',
    favMood: '조용한'
  });
  const [editedData, setEditedData] = useState(profileData);

  // ★ [추가] 오늘의 한 줄 목표 수정용 상태 시스템
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalText, setGoalText] = useState('홍대 투어 성공하기!');

  // ★ [추가] 폴라로이드 이미지 업로드 상태 시스템 (4개 칸)
  const [photos, setPhotos] = useState([null, null, null, null]);
  const fileInputRefs = [useRef(), useRef(), useRef(), useRef()];

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = [
    '', '', '', 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, ''
  ];

  // 일정을 기록한 날짜 목록 정의 (예시: 4일, 13일, 24일)
  const recordedDates = [4, 13, 24];

  // 일정이 기록된 초록 동그라미 날짜를 누를 때만 하루기록페이지(detail)로 이동!
  const handleDateClick = (date) => {
    if (!date) return;
    
    // 만약 일정이 기록된 날짜 배열에 포함되어 있다면 페이지 이동
    if (recordedDates.includes(date)) {
      const formattedDate = date < 10 ? `0${date}` : date;
      setSelectedDateStr(`2026.05.${formattedDate} (수)`);
      setScreen('detail'); 
    } else {
      // 일정이 없는 날은 클릭해도 아무 반응이 없도록 차단합니다.
      console.log(`${date}일은 기록된 일정이 없습니다.`);
    }
  };

  const toggleButton = (category, value) => {
    setSelectedButtons(prev => {
      const updated = { ...prev, [category]: prev[category] === value ? null : value };
      if (category === 'who' && updated.who === '혼자') {
        updated.count = null;
      }
      return updated;
    });
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  // ★ [추가] 폴라로이드 이미지 업로드 처리 함수
  const handlePhotoUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...photos];
        newPhotos[index] = reader.result;
        setPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const BottomNav = () => (
    <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '450px', height: '80px', backgroundColor: '#98B355', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxSizing: 'border-box', padding: '0 24px', zIndex: 100 }}>
      <div onClick={() => setScreen('create')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: screen === 'create' ? '#FFF' : 'rgba(255,255,255,0.7)', transition: '0.2s' }}>
        <span style={{ fontSize: '24px', marginBottom: '2px' }}>🔍</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>탐색</span>
      </div>
      <div onClick={() => setScreen('home')} style={{ position: 'relative', top: '-28px', cursor: 'pointer' }}>
        <div style={{ width: '68px', height: '68px', backgroundColor: '#FDFDFB', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}>
          <img src={beanImg} alt="홈" style={{ width: '48px', height: '48px' }} />
        </div>
      </div>
      <div onClick={() => { setScreen('mypage'); setIsEditing(false); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: screen === 'mypage' ? '#FFF' : 'rgba(255,255,255,0.7)', transition: '0.2s' }}>
        <span style={{ fontSize: '24px', marginBottom: '2px' }}>👤</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>마이페이지</span>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#F6F6F6', minHeight: '100vh', boxSizing: 'border-box' }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        body, div, input, button, p, span, h1, h2 { font-family: 'Noto Sans KR', sans-serif !important; -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* ==================== ① 로그인 화면 ==================== */}
      {screen === 'login' && (
        <div style={{ backgroundColor: '#FDFDFB', minHeight: '100vh', padding: '32px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '450px', margin: '0 auto', boxShadow: '0 0 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '18px', color: '#333', textAlign: 'center', marginBottom: '32px', fontWeight: 'bold' }}>로그인</div>
          <img src={beanImg} alt="하루콩" style={{ width: '120px', height: '120px', alignSelf: 'center' }} />
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4A5A3A', textAlign: 'center', margin: '16px 0', letterSpacing: '-0.5px' }}>하루콩</h1>
          <label style={{ fontSize: '14px', color: '#4A5A3A', fontWeight: '700', marginTop: '16px', marginBottom: '6px' }}>이메일</label>
          <input type="email" style={{ backgroundColor: '#F2EFE9', padding: '16px', borderRadius: '15px', fontSize: '14px', border: 'none', outline: 'none', marginBottom: '12px', width: '100%', boxSizing: 'border-box' }} placeholder="이메일을 입력하세요" />
          <label style={{ fontSize: '14px', color: '#4A5A3A', fontWeight: '700', marginTop: '10px', marginBottom: '6px' }}>비밀번호</label>
          <input type="password" style={{ backgroundColor: '#F2EFE9', padding: '16px', borderRadius: '15px', fontSize: '14px', border: 'none', outline: 'none', width: '100%', boxSizing: 'border-box' }} placeholder="비밀번호를 입력하세요" />
          <button onClick={() => setScreen('home')} style={{ backgroundColor: '#A2CB59', padding: '18px', borderRadius: '16px', marginTop: '36px', color: '#FFF', fontSize: '16px', fontWeight: '700', cursor: 'pointer', border: 'none', width: '100%', boxShadow: '0 4px 10px rgba(162,203,89,0.2)' }}>로그인</button>
          <p style={{ textAlign: 'center', marginTop: '24px', color: '#888', fontSize: '13px' }}>
            계정이 없으신가요? <span onClick={() => setScreen('register')} style={{ fontWeight: '700', color: '#4A5A3A', textDecoration: 'underline', marginLeft: '6px', cursor: 'pointer' }}>회원가입</span>
          </p>
        </div>
      )}

      {/* ==================== ② 회원가입 화면 ==================== */}
      {screen === 'register' && (
        <div style={{ backgroundColor: '#FDFDFB', minHeight: '100vh', padding: '32px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '450px', margin: '0 auto', boxShadow: '0 0 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '18px', color: '#333', textAlign: 'center', marginBottom: '32px', fontWeight: 'bold' }}>회원가입</div>
          <label style={{ fontSize: '14px', color: '#4A5A3A', fontWeight: '700', marginTop: '16px', marginBottom: '6px' }}>닉네임</label>
          <input type="text" style={{ backgroundColor: '#F2EFE9', padding: '16px', borderRadius: '15px', fontSize: '14px', border: 'none', outline: 'none', marginBottom: '12px', width: '100%', boxSizing: 'border-box' }} placeholder="닉네임을 입력하세요" />
          <label style={{ fontSize: '14px', color: '#4A5A3A', fontWeight: '700', marginTop: '10px', marginBottom: '6px' }}>이메일</label>
          <input type="email" style={{ backgroundColor: '#F2EFE9', padding: '16px', borderRadius: '15px', fontSize: '14px', border: 'none', outline: 'none', marginBottom: '12px', width: '100%', boxSizing: 'border-box' }} placeholder="이메일을 입력하세요" />
          <label style={{ fontSize: '14px', color: '#4A5A3A', fontWeight: '700', marginTop: '10px', marginBottom: '6px' }}>비밀번호</label>
          <input type="password" style={{ backgroundColor: '#F2EFE9', padding: '16px', borderRadius: '15px', fontSize: '14px', border: 'none', outline: 'none', width: '100%', boxSizing: 'border-box' }} placeholder="비밀번호를 입력하세요" />
          <button onClick={() => setScreen('login')} style={{ backgroundColor: '#A2CB59', padding: '18px', borderRadius: '16px', marginTop: '36px', color: '#FFF', fontSize: '16px', fontWeight: '700', cursor: 'pointer', border: 'none', width: '100%', boxShadow: '0 4px 10px rgba(162,203,89,0.2)' }}>회원가입</button>
          <p onClick={() => setScreen('login')} style={{ textAlign: 'center', marginTop: '24px', color: '#888', fontSize: '13px', cursor: 'pointer' }}>이미 계정이 있으신가요? <span style={{ fontWeight: '700', color: '#4A5A3A', textDecoration: 'underline', marginLeft: '6px' }}>로그인</span></p>
        </div>
      )}

      {/* ==================== ③ 메인 홈 화면 ==================== */}
      {screen === 'home' && (
        <div style={{ backgroundColor: '#FDFDFB', minHeight: '100vh', padding: '32px 24px', paddingBottom: '150px', boxSizing: 'border-box', maxWidth: '450px', margin: '0 auto', position: 'relative', boxShadow: '0 0 15px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#4A5A3A', marginTop: '16px', marginBottom: '6px', textAlign: 'center' }}>00님 좋은 아침이에요 🌤️</h2>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px', textAlign: 'center' }}>오늘은 어떤 하루를 만들어 드릴까요?</p>

          {/* ★ [수정] 직접 터치해서 실시간으로 수정 가능한 동적 목표 레이아웃 */}
          <div 
            onClick={() => !isEditingGoal && setIsEditingGoal(true)}
            style={{ border: '2px dashed #C2D8B3', borderRadius: '24px', padding: '20px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', cursor: 'pointer' }}
          >
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '13px', color: '#89A86E', display: 'block', marginBottom: '6px', fontWeight: '700' }}>오늘의 한 줄 목표 ✨</span>
              {isEditingGoal ? (
                <input 
                  type="text"
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  onBlur={() => setIsEditingGoal(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingGoal(false)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  style={{ fontSize: '15px', fontWeight: '700', color: '#333', border: 'none', outline: 'none', borderBottom: '1.5px solid #98B355', width: '90%', padding: '2px 0', backgroundColor: 'transparent' }}
                />
              ) : (
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#333', display: 'inline-block', width: '100%' }}>{goalText}</span>
              )}
            </div>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#E2F0D9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={beanImg} alt="콩" style={{ width: '38px', height: '38px' }} />
            </div>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '32px', border: '2px solid #BCD4A8', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
              <span style={{ color: '#9AB778', fontWeight: 'bold', cursor: 'pointer' }}>&lt;</span>
              <div style={{ fontWeight: '700', color: '#5C7A43', fontSize: '17px' }}>2026년 5월</div>
              <span style={{ color: '#9AB778', fontWeight: 'bold', cursor: 'pointer' }}>&gt;</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center', fontSize: '12px', fontWeight: '700', marginBottom: '20px' }}>
              {days.map((d, i) => (
                <div key={i} style={{ color: i === 0 ? '#FF8A8A' : i === 6 ? '#8AB3FF' : '#A0A0A0' }}>{d}</div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '18px', columnGap: '10px', textAlign: 'center', fontSize: '14px' }}>
              {dates.map((date, i) => {
                const hasRecord = date && recordedDates.includes(date);

                return (
                  <div 
                    key={i} 
                    onClick={() => handleDateClick(date)}
                    style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '34px', position: 'relative',
                      cursor: date ? 'pointer' : 'default',
                    }}
                  >
                    {hasRecord ? (
                      <div style={{ 
                        width: '32px', height: '32px', backgroundColor: '#9AB778', color: '#FFF', 
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontWeight: '700', fontSize: '13px', boxShadow: '0 2px 6px rgba(154,183,120,0.3)' 
                      }}>
                        {date}
                      </div>
                    ) : (
                      <span style={{ color: '#333', fontWeight: '600' }}>{date}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <BottomNav />
        </div>
      )}

      {/* ==================== ④ 하루기록페이지 ==================== */}
      {screen === 'detail' && (
        <div style={{ 
          backgroundColor: '#F9FDF6', 
          minHeight: '100vh', 
          padding: '32px 24px', 
          paddingBottom: '140px', 
          boxSizing: 'border-box', 
          maxWidth: '450px', 
          margin: '0 auto', 
          position: 'relative',
          overflowX: 'hidden',
          fontFamily: '"Pretendard", sans-serif'
        }}>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <span onClick={() => setScreen('home')} style={{ cursor: 'pointer', fontSize: '22px', marginRight: '12px', color: '#98B355', fontWeight: 'bold' }}>&lt;</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#82A161', flex: 1, textAlign: 'center', marginRight: '24px' }}>{selectedDateStr}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#5C7A43', lineHeight: '1.4' }}>
                홍대에서<br/>즐거운 하루를 보냈어요
              </span>
              <div style={{ width: '58px', height: '58px', backgroundColor: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D5E6CD', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <img src={beanImg} alt="콩콩이" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
              </div>
            </div>

            {/* 오늘의 한 줄 목표 (동적 상호작용 반영) */}
            
            <div style={{ position: 'relative', paddingLeft: '28px', marginBottom: '10px' }}>
              <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '20px', width: '2px', backgroundColor: '#C5DCB2' }}></div>

              {/* 코스 1 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px dotted #CDDEC0' }}>
                <div style={{ position: 'absolute', left: '-26px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#98B355' }}></div>
                <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#98B355', minWidth: '45px', paddingTop: '2px' }}>12 : 00</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#4A6334' }}>홍대 일식집 '초밥킹'</div>
                    <div style={{ fontSize: '11px', color: '#8A9B7D', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#FA7070', marginRight: '2px', fontSize: '11px' }}>📍</span> 서울특별시 마포구....
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '80px', marginLeft: '10px' }}>
                  <span style={{ color: '#FA7070', fontSize: '16px' }}>❤️</span>
                  <div style={{ fontSize: '9px', color: '#9BB28C', lineHeight: '1.3', marginTop: '2px' }}>또 가고싶은<br/>장소로 남겨놨어요</div>
                </div>
              </div>

              {/* 코스 2 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px dotted #CDDEC0' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: '2.5px solid #98B355' }}></div>
                <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#98B355', minWidth: '45px', paddingTop: '2px' }}>14 : 00</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#4A6334' }}>홍대 카페 '어니언'</div>
                    <div style={{ fontSize: '11px', color: '#8A9B7D', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#FA7070', marginRight: '2px', fontSize: '11px' }}>📍</span> 서울특별시 마포구....
                    </div>
                  </div>
                </div>
                <div style={{ minWidth: '80px' }}></div>
              </div>

              {/* 코스 3 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px dotted #CDDEC0' }}>
                <div style={{ position: 'absolute', left: '-26px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#98B355' }}></div>
                <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#98B355', minWidth: '45px', paddingTop: '2px' }}>17 : 00</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#4A6334' }}>홍대 산책하기</div>
                    <div style={{ fontSize: '11px', color: '#8A9B7D', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#FA7070', marginRight: '2px', fontSize: '11px' }}>📍</span> 서울특별시 마포구....
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '80px', marginLeft: '10px' }}>
                  <span style={{ color: '#FA7070', fontSize: '16px' }}>❤️</span>
                  <div style={{ fontSize: '9px', color: '#9BB28C', lineHeight: '1.3', marginTop: '2px' }}>또 가고싶은<br/>장소로 남겨놨어요</div>
                </div>
              </div>

              {/* 코스 4 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', marginBottom: '10px' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: '2.5px solid #98B355' }}></div>
                <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#98B355', minWidth: '45px', paddingTop: '2px' }}>18 : 30</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#4A6334' }}>홍대 한식집 '밥짱'</div>
                    <div style={{ fontSize: '11px', color: '#8A9B7D', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#FA7070', marginRight: '2px', fontSize: '11px' }}>📍</span> 서울특별시 마포구....
                    </div>
                  </div>
                </div>
                <div style={{ minWidth: '80px' }}></div>
              </div>
            </div>

            <div style={{ 
              position: 'relative', 
              marginLeft: '-24px', 
              marginRight: '-24px', 
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '40px',
              paddingBottom: '30px',
              background: 'linear-gradient(to bottom, #F9FDF6 0%, #E3F2D3 40%, #D1E7BA 100%)' 
            }}>
              
              {/* ★ [수정] 직접 사진을 업로드할 수 있는 대롱대롱 폴라로이드 구조 연동 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '0 5px', marginBottom: '35px' }}>
                {[
                  { id: 0, y: '0px' },  { id: 1, y: '30px' }, 
                  { id: 2, y: '-5px' }, { id: 3, y: '20px' }
                ].map((img, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%', transform: `translateY(${img.y})` }}>
                    <div style={{ width: '1.5px', height: '24px', backgroundColor: '#7FA462' }}></div>
                    <div 
                      onClick={() => fileInputRefs[i].current.click()}
                      style={{ 
                        width: '100%', aspectRatio: '1/1.25', backgroundColor: '#D4DDD0', border: '1px solid #BAC9B4', borderRadius: '3px', boxShadow: '0 4px 10px rgba(0,0,0,0.04)', cursor: 'pointer', overflow: 'hidden',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                      }}
                    >
                      {photos[i] ? (
                        <img src={photos[i]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="upload" />
                      ) : (
                        <span style={{ fontSize: '16px', color: '#7FA462', fontWeight: 'bold' }}>+</span>
                      )}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRefs[i]} 
                      style={{ display: 'none' }} 
                      onChange={(e) => handlePhotoUpload(i, e)} 
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingLeft: '5px' }}>
                <span style={{ backgroundColor: '#EDF7E3', color: '#5C7A43', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}># 일식 최고</span>
                <span style={{ backgroundColor: '#EDF7E3', color: '#5C7A43', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}># 홍대 나들이</span>
                <span style={{ backgroundColor: '#EDF7E3', color: '#5C7A43', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}># 즐거운 하루</span>
              </div>

            </div>

          </div>
          <BottomNav />
        </div>
      )}

      {/* ==================== ⑤ 일정 만들기 화면 ==================== */}
      {screen === 'create' && (
        <div style={{ backgroundColor: '#FDFDFB', minHeight: '100vh', padding: '32px 24px', paddingBottom: '120px', boxSizing: 'border-box', maxWidth: '450px', margin: '0 auto', position: 'relative', boxShadow: '0 0 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#7A8A6A', textAlign: 'center', marginBottom: '24px' }}>일정 만들기</div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#7A8A6A', marginBottom: '10px' }}>누구랑?</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['친구', '연인', '가족', '혼자'].map(item => {
                const isSelected = selectedButtons.who === item;
                return (
                  <button key={item} onClick={() => toggleButton('who', item)} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: isSelected ? '#5C7A43' : '#F0F0F0', border: 'none', color: isSelected ? '#FFF' : '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}>
                    {item === '친구' && '👥 '}{item === '연인' && '❤️ '}{item === '가족' && '🏡 '}{item === '혼자' && '👤 '}{item}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '20px', opacity: selectedButtons.who === '혼자' ? 0.4 : 1, transition: '0.2s' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#7A8A6A', marginBottom: '10px' }}>몇 명이서?</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['2명', '3명', '4명', '5명이상'].map(item => {
                const isSelected = selectedButtons.count === item;
                return (
                  <button key={item} onClick={() => selectedButtons.who !== '혼자' && toggleButton('count', item)} disabled={selectedButtons.who === '혼자'} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: isSelected ? '#5C7A43' : '#F0F0F0', border: 'none', color: isSelected ? '#FFF' : '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: selectedButtons.who === '혼자' ? 'not-allowed' : 'pointer', transition: '0.2s' }}>
                    🔢 {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#7A8A6A', marginBottom: '10px' }}>어디서?</div>
            <input type="text" placeholder="위치 검색" style={{ width: '100%', padding: '12px 16px', borderRadius: '20px', border: '1px solid #E0DCD3', backgroundColor: '#FFF', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#7A8A6A', marginBottom: '10px' }}>뭐 먹지?</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['한식', '일식', '양식', '중식'].map(item => {
                const isSelected = selectedButtons.what === item;
                return (
                  <button key={item} onClick={() => toggleButton('what', item)} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: isSelected ? '#5C7A43' : '#F0F0F0', border: 'none', color: isSelected ? '#FFF' : '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}>
                    {item === '한식' && '🍚 '}{item === '일식' && '🍣 '}{item === '양식' && '🍝 '}{item === '중식' && '🥟 '}{item}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#7A8A6A', marginBottom: '10px' }}>시간은?</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['아침', '점심', '저녁', '밤'].map(item => {
                const isSelected = selectedButtons.time === item;
                return (
                  <button key={item} onClick={() => toggleButton('time', item)} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: isSelected ? '#5C7A43' : '#F0F0F0', border: 'none', color: isSelected ? '#FFF' : '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}>
                    {item === '아침' && '🌅 '}{item === '점심' && '☀️ '}{item === '저녁' && '🌆 '}{item === '밤' && '🌙 '}{item}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={() => setScreen('recommend')} style={{ width: '100%', backgroundColor: '#A2CB59', color: '#FFF', padding: '16px', border: 'none', borderRadius: '15px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '20px', boxShadow: '0 4px 10px rgba(162,203,89,0.3)' }}>
            AI 일정 추천 받기 ✨
          </button>
          <BottomNav />
        </div>
      )}

      {/* ==================== ⑥ AI 추천 결과 화면 ==================== */}
      {screen === 'recommend' && (
        <div style={{ backgroundColor: '#FDFDFB', minHeight: '100vh', padding: '32px 24px', paddingBottom: '120px', boxSizing: 'border-box', maxWidth: '450px', margin: '0 auto', position: 'relative', boxShadow: '0 0 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#7A8A6A', textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}>
            추천 일정이에요!
          </div>
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', backgroundColor: '#A2CB59' }}></div>
            <div style={{ position: 'relative', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px dashed rgba(122,138,106,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFF', border: '3px solid #A2CB59' }}></div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#7A8A6A' }}>12 : 00</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: '3px' }}>홍대 일식집 '초밥킹'</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>📍 서울특별시 마포구....</div>
              </div>
              <div style={{ width: '75px', height: '90px', backgroundColor: '#E0E0E0', borderRadius: '6px', flexShrink: 0, marginLeft: '12px' }}></div>
            </div>
            <div style={{ position: 'relative', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px dashed rgba(122,138,106,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFF', border: '3px solid #A2CB59' }}></div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#7A8A6A' }}>14 : 00</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: '3px' }}>홍대 카페 '어니언'</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>📍 서울특별시 마포구....</div>
              </div>
              <div style={{ width: '75px', height: '90px', backgroundColor: '#E0E0E0', borderRadius: '6px', flexShrink: 0, marginLeft: '12px' }}></div>
            </div>
            <div style={{ position: 'relative', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px dashed rgba(122,138,106,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFF', border: '3px solid #A2CB59' }}></div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#7A8A6A' }}>14 : 00</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: '3px' }}>홍대 저녁 산책하기</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>📍 서울특별시 마포구....</div>
              </div>
              <div style={{ width: '75px', height: '90px', backgroundColor: '#E0E0E0', borderRadius: '6px', flexShrink: 0, marginLeft: '12px' }}></div>
            </div>
            <div style={{ position: 'relative', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px dashed rgba(122,138,106,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFF', border: '3px solid #A2CB59' }}></div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#7A8A6A' }}>14 : 00</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: '3px' }}>홍대 저녁 한식집</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>📍 서울특별시 마포구....</div>
              </div>
              <div style={{ width: '75px', height: '90px', backgroundColor: '#E0E0E0', borderRadius: '6px', flexShrink: 0, marginLeft: '12px' }}></div>
            </div>
          </div>
          <BottomNav />
        </div>
      )}

      {/* ==================== ⑦ 마이페이지 화면 ==================== */}
      {screen === 'mypage' && (
        <div style={{ backgroundColor: '#FDFDFB', minHeight: '100vh', padding: '32px 24px', paddingBottom: '120px', boxSizing: 'border-box', maxWidth: '450px', margin: '0 auto', position: 'relative', boxShadow: '0 0 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '30px' }}>
            <img src={beanImg} alt="프로필" style={{ width: '68px', height: '68px', marginRight: '16px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} />
            {isEditing ? (
              <input name="nickname" value={editedData.nickname} onChange={handleProfileInputChange} style={{ fontSize: '20px', fontWeight: '700', color: '#333', border: '1px solid #CCC', borderRadius: '8px', padding: '4px 8px', width: '120px', outline: 'none' }} />
            ) : (
              <span style={{ fontSize: '22px', fontWeight: '700', color: '#333', flex: 1 }}>{profileData.nickname}</span>
            )}
            {!isEditing && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setEditedData(profileData); setIsEditing(true); }} style={{ backgroundColor: 'transparent', border: '1px solid #CCC', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#666', cursor: 'pointer', fontWeight: '500' }}>수정</button>
                <button onClick={() => setScreen('login')} style={{ backgroundColor: '#7A8A6A', border: 'none', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#FFF', cursor: 'pointer', fontWeight: '700' }}>로그인 화면으로</button>
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #E0DCD3', borderRadius: '18px', backgroundColor: '#FFF', overflow: 'hidden', boxShadow: '0 6px 15px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
            {[
              { label: '나이', key: 'age', value: isEditing ? editedData.age : profileData.age },
              { label: '직업', key: 'job', value: isEditing ? editedData.job : profileData.job },
              { label: '알러지 정보', key: 'allergy', value: isEditing ? editedData.allergy : profileData.allergy },
              { label: '선호하는 음식', key: 'favFood', value: isEditing ? editedData.favFood : profileData.favFood },
              { label: '선호하는 활동', key: 'favActivity', value: isEditing ? editedData.favActivity : profileData.favActivity },
              { label: '좋아하는 분위기', key: 'favMood', value: isEditing ? editedData.favMood : profileData.favMood },
            ].map((item, index, arr) => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: index === arr.length - 1 ? 'none' : '1px solid #E0DCD3', boxSizing: 'border-box' }}>
                <span style={{ color: '#7A8A6A', fontWeight: '700', fontSize: '15px' }}>{item.label}</span>
                {isEditing ? (
                  <input name={item.key} value={item.value} onChange={handleProfileInputChange} style={{ fontSize: '15px', color: '#333', fontWeight: '500', border: '1px solid #CCC', borderRadius: '6px', padding: '4px 8px', width: '50%', textAlign: 'right', outline: 'none' }} />
                ) : (
                  <span style={{ color: '#333', fontWeight: '500', fontSize: '15px' }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => { setProfileData(editedData); setIsEditing(false); }} style={{ padding: '10px 24px', backgroundColor: '#A2CB59', border: 'none', borderRadius: '20px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>저장</button>
              <button onClick={() => setIsEditing(false)} style={{ padding: '10px 24px', backgroundColor: '#FFF', border: '1px solid #CCC', borderRadius: '20px', fontSize: '14px', color: '#777', cursor: 'pointer' }}>취소</button>
            </div>
          )}
          <BottomNav />
        </div>
      )}
    </div>
  );
}