package cs.dit.member;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;


/**
 * 패키지명 : cs.dit.member
 * 파일명 : MemberDAO.java
 * 작성일 : 2025. 4. 16.
 * 작성자 : 임선우
 * 변경이력 : 
 *
 * 프로그램 설명 : 데이터베이스와 연동하고 CRUD가 가능한 메소드
 */
public class MemberDAO {
	//DB연동 커넥션 생성
	public Connection getConnection() throws Exception {
		//connection pool을 활용한 db연동
		Context initCtx = new InitialContext();
		Context envCtx = (Context)initCtx.lookup("java:comp/env");
		DataSource ds = (DataSource)envCtx.lookup("jdbc/swlim");
		Connection con = ds.getConnection();
		
		return con;
	}
	// 커넥션을 통해 테이블에 데이터 입력 
	// (파라메터로 받은 3개의 데이터를 DB에 저장)
	public void insert(MemberDTO dto) {
		String sql = "INSERT INTO users (id, name, password) VALUES (?, ?, ?)";
		try(
			Connection con = getConnection();
			PreparedStatement pstmt = con.prepareStatement(sql);
		) {
			pstmt.setString(1, dto.getId());
			pstmt.setString(2, dto.getName());
			pstmt.setString(3, dto.getPwd());
			
			pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	//DB에서 레코드 조회
	public ArrayList<MemberDTO> list(){
		String sql = "SELECT id, name, password FROM MEMBER";
		ArrayList<MemberDTO> dtos = new ArrayList<MemberDTO>();
		try(Connection con = getConnection();
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(sql);
				) { // ResultSet에 들어있는 레코드를 추출하여 ArrayList에 추가
						while(rs.next()) {
							String id = rs.getString("id");
							String name = rs.getString("name");
							String password = rs.getString("password");
							MemberDTO dto = new MemberDTO(id, name, password);
							
							dtos.add(dto);
						}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dtos;
	}
}

