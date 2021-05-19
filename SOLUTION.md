# 박스 생성
HTML로 박스를 생성해주는 것이 아니라 JavaScript에서 addNewBox()를 사용하여 박스를 생성하도록 구현하였습니다. 박스는 <div> 태그로 만들었으며, 하나의 박스가 2개의 버튼을 가지게 됩니다. 각 버튼 또한 <div> 태그로 만들었습니다.

최초 실행시 2개의 박스가 화면에 떠 있을 수 있도록 defaultSetting()를 구현하였습니다.

# 박스 드래그
JQuery의 draggable()을 사용하여 박스 컴포넌트가 드래그 가능하도록 구현하였습니다.

# 박스 간 연결
박스 간 연결에는 3가지 event listener가 사용되었습니다. 모든 버튼이 mouse down에 대한 event listener를 갖고, <body> 태그가 mouse move와 mouse up에 대한 event listener를 갖습니다.

큰 흐름은 다음과 같습니다. 버튼 위에서 mouse down이 발생하면(버튼이 클릭되면), 현재 버튼이 어떤 박스의 버튼인지와 위치가 변수에 저장되고 line(점선)이 생성됩니다. 이후 <body> 태그(전체 화면) 내 mouse move에 따라서 점선의 끝점이 이동합니다. 마지막으로 mouse up이 발생했을 때 event가 발생한 target이 다른 버튼이면, 실선이 생성됩니다.

### 1) mouse down event 발생 시: mouseDownHandler()
mouse move 발생 시 판단을 위해 mouse_down 변수 값을 true로 만들어줍니다.
현재 버튼이 어떤 박스에 포함된 버튼인지 확인하기 위해 start_btn_class에 버튼의 클래스 명이 저장됩니다. 또한 line의 거리계산을 위해 clientX, clientY 값을 start_x, start_y 변수에 저장합니다.
이제 line 컴포넌트를 생성하는데, line 컴포넌트 또한 <div> 태그로 만들었으며, 아직은 실선이 아닌 점선이므로 클래스에 not_fixed를 넣어줍니다. 점선의 시작 위치는 현재 버튼 위치이므로, top, left 값이 start_y, start_x 값이 됩니다.

### 2) mouse move event 발생 시: mouseMoveHandler()
mouse down이 true일 경우 line의 길이와 회전 각도를 계산하여 style 값으로 넣어줍니다. 길이 계산에는 유클리디안 거리 공식을, 각도 계산에는 역삼각함수를 사용하였습니다.

### 3) mouse up event 발생 시: mouseUpHandler()
mouse_down 변수를 false로 지정해주고, 현재 마우스가 위치한 타겟이 버튼인지 확인합니다. 만약 버튼일 경우, 점선이 시작된 버튼과 다른 버튼인지 start_btn_class 변수를 사용하여 확인합니다. 만약 두 조건이 모두 만족된 버튼이라면, 점선의 클래스명의 not_fixed를 fixed로 설정해 실선으로 바뀌도록 하였습니다. 이때, 선의 섀도우가 블럭의 섀도우와 방향이 갖도록 해주기 위해서 회전 각도가 -90이하이거나 90도 이상일 경우 line을 반대로 생성하도록 구현해주었습니다.
만약 line이 실선이 될 수 있는 두 가지 조건 중 한 조건이라도 만족하지 못했다면 line 컴포넌트를 제거해주었습니다.
