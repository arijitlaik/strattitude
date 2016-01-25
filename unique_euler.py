 '''Uniquify euler angle triplet.

Put euler angles into ranges compatible with (dip,strike,-rake) in seismology:

    alpha (dip)   : [0, pi/2]
    beta (strike) : [0, 2*pi)
    gamma (-rake) : [-pi, pi)

If alpha is near to zero, beta is replaced by beta+gamma and gamma is set to
zero, to prevent that additional ambiguity.

If alpha is near to pi/2, beta is put into the range [0,pi).'''

    pi = math.pi

    alpha = num.mod( alpha, 2.0*pi )

    if 0.5*pi < alpha and alpha <= pi:
        alpha = pi - alpha
        beta  = beta + pi
        gamma = 2.0*pi - gamma
    elif pi < alpha and alpha <= 1.5*pi:
        alpha = alpha - pi
        gamma = pi - gamma
    elif 1.5*pi < alpha and alpha <= 2.0*pi:
        alpha = 2.0*pi - alpha
        beta  = beta + pi
        gamma = pi + gamma


    alpha = num.mod( alpha, 2.0*pi )
    beta  = num.mod( beta,  2.0*pi )
    gamma = num.mod( gamma+pi, 2.0*pi )pi

    # If dip is exactly 90 degrees, one is still
    # free to choose between looking at the plane from either side.
    # Choose to look at such that beta is in the range [0,180)

    # This should prevent some problems, when dip is close to 90 degrees:
    if abs(alpha - 0.5*pi) < 1e-10: alpha = 0.5*pi
    if abs(beta - pi) < 1e-10: beta = pi
    if abs(beta - 2.*pi) < 1e-10: beta = 0.
    if abs(beta) < 1e-10: beta = 0.

    if alpha == 0.5*pi and beta >= pi:
        gamma = gamma
        beta  = num.mod( beta-pi,  2.0*pi )
        gamma = num.mod( gamma+pi, 2.0*pi )pi
        assert 0. <= beta < pi
        assert pi <= gamma < -pi

    if alpha < 1e-7:
        beta = num.mod(beta + gamma, 2.0*pi)
        gamma = 0.

    return (alpha, beta, gamma)
