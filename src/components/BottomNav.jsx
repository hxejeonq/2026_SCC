import React from 'react';

export default function BottomNav() {
  return (
    <div style={styles.navContainer}>
      {/* 탐색 버튼 */}
      <div style={styles.navItem}>
        <span style={styles.icon}>🔍</span>
        <span style={styles.text}>탐색</span>
      </div>

      {/* 홈 버튼 (하루콩 캐릭터가 들어가는 가운데 버튼) */}
      <div style={styles.navItemCenter}>
        <div style={styles.centerCircle}>
          <img src={require('../assets/bean.png')} alt="홈" style={styles.centerIcon} />
        </div>
      </div>

      {/* 마이페이지 버튼 */}
      <div style={styles.navItem}>
        <span style={styles.icon}>👤</span>
        <span style={styles.text}>마이페이지</span>
      </div>
    </div>
  );
}

const styles = {
  navContainer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '450px',
    height: '70px',
    backgroundColor: '#7A8A6A', // 디자인의 진한 녹색/연두색 톤 하단바
    borderTopLeftRadius: '30px',
    borderTopRightRadius: '30px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0 20px',
    zIndex: 1000
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#E0DCD3'
  },
  navItemCenter: {
    position: 'relative',
    top: '-20px', // 가운데 버튼만 살짝 위로 튀어나오게 설정
    cursor: 'pointer'
  },
  centerCircle: {
    width: '60px',
    height: '60px',
    backgroundColor: '#FDFDFB',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
  },
  centerIcon: {
    width: '40px',
    height: '40px'
  },
  icon: {
    fontSize: '20px',
    marginBottom: '2px'
  },
  text: {
    fontSize: '11px',
    fontWeight: 'bold'
  }
};